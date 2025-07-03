const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter factory for different file types
function fileFilterFactory(allowedTypes) {
    return function(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const mimetypeAllowed = allowedTypes.some(type => file.mimetype === type.mimetype);
        const extAllowed = allowedTypes.some(type => ext === type.ext);

        if (mimetypeAllowed && extAllowed) {
            cb(null, true);
        } else {
            cb(new Error(`Only ${allowedTypes.map(t => t.label).join(', ')} files are allowed!`));
        }
    }
}

// Allowed types
const imageTypes = [
    { mimetype: 'image/jpeg', ext: '.jpg', label: 'JPEG' },
    { mimetype: 'image/jpeg', ext: '.jpeg', label: 'JPEG' },
    { mimetype: 'image/png', ext: '.png', label: 'PNG' },
    { mimetype: 'image/gif', ext: '.gif', label: 'GIF' }
];

const pdfTypes = [
    { mimetype: 'application/pdf', ext: '.pdf', label: 'PDF' }
];

// Export both uploaders
const uploadImage = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilterFactory(imageTypes)
});

const uploadPDF = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilterFactory(pdfTypes)
});

module.exports = {
    uploadImage, // .single('image')
    uploadPDF // .single('attachment')
};