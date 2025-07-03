const Quote = require('../models/Quote');
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables
const path = require('path');


// Add a new quote request
exports.addQuote = async(req, res) => {
    try {
        const { fullName, email, phone, companyName, serviceInterested, message } = req.body;
        const attachment = req.file ? req.file.filename : null;

        // Validate required fields
        if (!fullName || !email || !serviceInterested || !message) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Save to database
        const quote = new Quote({
            fullName,
            email,
            phone,
            companyName,
            serviceInterested,
            message,
            attachment
        });

        await quote.save();

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "kiran899964@gmail.com",
                pass: "djjykbogdxqqnpyx"
            }
        });

        // Prepare email options
        const mailOptions = {
            from: `"Quote Request" <${email}>`,
            to: "kiran899964@gmail.com",
            subject: "New Quote Request",
            text: `You have a new quote request from ${fullName}.
Email: ${email}
Phone: ${phone}
Company Name: ${companyName}
Service Interested: ${serviceInterested}
Message: ${message}`,
            attachments: attachment ? [{
                filename: req.file.originalname,
                path: path.resolve(__dirname, "..", "uploads", attachment),
                contentType: "application/pdf"
            }] : []
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "✅ Quote request submitted successfully. We will get back to you soon!",
            quote
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error in addQuote:", error);

        // Send a clear error message to the frontend
        res.status(500).json({
            message: "Server error",
            error: error.message || error
        });
    }
};

// Get all quote requests
exports.getQuotes = async(req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a quote request by ID
exports.getQuoteById = async(req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote request not found' });
        }
        res.json({ message: 'Quote request fetched successfully', quote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a quote request
exports.deleteQuote = async(req, res) => {
    try {
        const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
        if (!deletedQuote) {
            return res.status(404).json({ message: 'Quote request not found' });
        }
        res.status(200).json({ message: 'Quote request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};