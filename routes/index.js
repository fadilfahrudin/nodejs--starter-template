const express = require('express');
const userRoutes = require('./userRoutes.js');
const bookRoutes = require('./bookRoutes.js');
const router = express();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/books', bookRoutes);

module.exports = router;