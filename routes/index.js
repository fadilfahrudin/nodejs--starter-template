const express = require('express');
const userRoutes = require('./userRoutes.js');
const bookRoutes = require('./bookRoutes.js');
const router = express();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;