const express = require('express');
const { addQuote, getQuotes, getQuoteById, deleteQuote } = require('../controllers/quoteController');
const { uploadPDF } = require('../config/multerConfig');

const router = express.Router();

router.post('/submit', uploadPDF.single('attachment'), addQuote);
router.get('/get', getQuotes);
router.get('/:id', getQuoteById);
router.delete('/:id', deleteQuote);

module.exports = router;