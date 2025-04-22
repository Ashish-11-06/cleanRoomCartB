const Quote = require('../models/Quote');
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Add a new quote request
exports.addQuote = async(req, res) => {
    try {
        const { fullName, email, phone, companyName, serviceInterested, message } = req.body;

        const quote = new Quote({
            fullName,
            email,
            phone,
            companyName,
            serviceInterested,
            message,
        });

        await quote.save();

        // SMTP transporter setup
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Replace with your SMTP server
            port: 587, // or 465 if using SSL
            secure: false, // true for 465, false for other ports
            auth: {
                user: "kiran899964@gmail.com", // SMTP email
                pass: "djjykbogdxqqnpyx" // SMTP password
            }
        });

        // Email options
        const mailOptions = {
            from: email,
            to: "kiran899964@gmail.com",
            subject: "New Quote Request",
            text: `You have a new quote request from ${fullName}.
                   Email: ${email}
                   Phone: ${phone}
                   Company Name: ${companyName}
                   Service Interested: ${serviceInterested}
                   Message: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
        res.status(201).json({ message: "✅ Quote request submitted successfully. We will get back to you soon!", quote });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error });
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