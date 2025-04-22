const express = require('express');
const router = express.Router();
const advertiseController = require('../controllers/advertiseController');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

// POST: Create new advertisement with image upload
router.post('/', upload.single('bannerImage'), advertiseController.createAd);

// GET: Fetch all advertisements
router.get('/', advertiseController.getAllAds);

// DELETE: Delete advertisement by ID
router.delete('/:id', advertiseController.deleteAd);

module.exports = router;