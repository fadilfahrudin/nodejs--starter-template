const express = require('express');
const userRoutes = require('./userRoutes.js');
const bookRoutes = require('./bookRoutes.js');
const router = express();
const multer = require('multer')
const upload = multer()

router.use('/api/v1/users', upload.none(), userRoutes);
router.use('/api/v1/books', upload.none(), bookRoutes);

module.exports = router;