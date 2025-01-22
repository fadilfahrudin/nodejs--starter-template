const multer = require("multer");
const path = require("path");

// Store Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');  // Sesuaikan path sesuai kebutuhan
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);

        // Ganti spasi dan simbol dengan tanda hubung
        const sanitizedFileName = originalName.replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${Date.now()}-${sanitizedFileName}${extension}`);
    }
});

// Setup file filter based on MIME types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg', 'image/png', 'image/gif',  // Gambar
        'video/mp4', 'video/x-msvideo', 'video/x-matroska',  // Video
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  // Dokumen
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 } // 50MB, sesuaikan jika perlu
});


module.exports = upload;