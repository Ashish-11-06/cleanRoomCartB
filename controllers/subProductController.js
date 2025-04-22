const SubProduct = require("../models/subProductModel");
const Product = require("../models/ProductModel");

exports.addSubProduct = async(req, res) => {
    try {
        const { productId, name, price, size, color, height, width } = req.body;
        if (!productId || !name || price === undefined) {
            return res.status(400).json({ message: "Product ID, name, and price are required!" });
        }
        const newSubProduct = new SubProduct({ productId, name, price, size, color, height, width });
        await newSubProduct.save();
        res.status(201).json({ message: "Subproduct added successfully!", subProduct: newSubProduct });
    } catch (error) {
        console.error("Error adding subproduct:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getSubProducts = async(req, res) => {
    try {
        const subProducts = await SubProduct.find().populate("productId").lean();
        res.status(200).json(subProducts);
    } catch (error) {
        console.error("Error fetching subproducts:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getSubProductsByProductId = async(req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) return res.status(400).json({ message: "Product ID is required" });
        const subProducts = await SubProduct.find({ productId }).populate("productId").lean();
        res.status(200).json(subProducts);
    } catch (error) {
        console.error("Error fetching subproducts by product ID:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.deleteSubProduct = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Subproduct ID is required" });
        const subProduct = await SubProduct.findById(id);
        if (!subProduct) return res.status(404).json({ message: "Subproduct not found" });
        await SubProduct.findByIdAndDelete(id);
        res.status(200).json({ message: "Subproduct deleted successfully!" });
    } catch (error) {
        console.error("Error deleting subproduct:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateSubProduct = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Subproduct ID is required" });
        const updatedSubProduct = await SubProduct.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedSubProduct) return res.status(404).json({ message: "Subproduct not found" });
        res.status(200).json({ message: "Subproduct updated successfully!", subProduct: updatedSubProduct });
    } catch (error) {
        console.error("Error updating subproduct:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getFilters = async(req, res) => {
    try {
        const filtersWithCounts = await SubProduct.aggregate([{
            $group: {
                _id: {
                    color: "$color",
                    size: "$size",
                    price: "$price",
                    width: "$width",
                    height: "$height",
                },
                count: { $sum: 1 },
            },
        }, ]);

        const filters = {
            colors: {},
            sizes: {},
            prices: {},
            widths: {},
            heights: {},
        };

        filtersWithCounts.forEach((item) => {
            if (item._id.color) {
                filters.colors[item._id.color] = (filters.colors[item._id.color] || 0) + item.count;
            }
            if (item._id.size) {
                filters.sizes[item._id.size] = (filters.sizes[item._id.size] || 0) + item.count;
            }
            if (item._id.price) {
                filters.prices[item._id.price] = (filters.prices[item._id.price] || 0) + item.count;
            }
            if (item._id.width) {
                filters.widths[item._id.width] = (filters.widths[item._id.width] || 0) + item.count;
            }
            if (item._id.height) {
                filters.heights[item._id.height] = (filters.heights[item._id.height] || 0) + item.count;
            }
        });

        const formattedFilters = Object.keys(filters).reduce((acc, key) => {
            acc[key] = Object.entries(filters[key]).map(([value, count]) => ({
                value,
                count,
            }));
            return acc;
        }, {});

        res.status(200).json({ filters: formattedFilters });
    } catch (error) {
        console.error("Error fetching filters:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getFilteredProducts = async(req, res) => {
    try {
        const { colors, sizes, priceRange, widths, heights } = req.body;
        const subcategoryId = req.params.subcategoryId;

        // Build the query for SubProducts
        const subproductQuery = {};

        if (colors && colors.length > 0) {
            subproductQuery.color = { $in: colors };
        }
        if (sizes && sizes.length > 0) {
            subproductQuery.size = { $in: sizes };
        }
        if (widths && widths.length > 0) {
            subproductQuery.width = { $in: widths };
        }
        if (heights && heights.length > 0) {
            subproductQuery.height = { $in: heights };
        }

        if (priceRange && priceRange.length === 2) {
            subproductQuery.price = { $gte: priceRange[0], $lte: priceRange[1] };
        }

        // Fetch SubProducts based on the filters
        const filteredSubproducts = await SubProduct.find(subproductQuery);

        // Extract Product IDs
        const filteredProductIds = [...new Set(filteredSubproducts.map(subproduct => subproduct.productId.toString()))]; // Convert ObjectIds to strings

        if (filteredProductIds.length === 0) {
            return res.status(200).json([]); // Return empty array if no products match
        }

        // Fetch Products that match the extracted Product IDs AND belong to the specified subcategory
        const filteredProducts = await Product.find({
            _id: { $in: filteredProductIds },
            subcategory: subcategoryId // Use 'subcategory' field
        });

        res.status(200).json(filteredProducts);

    } catch (error) {
        console.error("Error fetching filtered products:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};