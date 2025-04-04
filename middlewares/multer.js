const multer = require("multer");
const path = require("path");

// Store Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname).toLowerCase();

        // Hapus karakter berbahaya
        const sanitizedFileName = originalName.replace(/[^a-zA-Z0-9_-]/g, '');
        
        cb(null, `${Date.now()}-${sanitizedFileName}${extension}`);
    }
});

// Setup file filter based on MIME types
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.mkv', '.pdf', '.doc', '.docx'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
        return cb(new Error('Invalid file extension'), false);
    }

    const allowedMimeTypes = [
        'image/jpeg', 'image/png', 'image/gif',
        'video/mp4', 'video/x-msvideo', 'video/x-matroska',
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type'), false);
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 } // 50MB, sesuaikan jika perlu
});


module.exports = upload;