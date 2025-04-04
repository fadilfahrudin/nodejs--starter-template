const express = require('express');
const userRoutes = require('./userRoutes.js');
const router = express();

router.use('/api/v1', userRoutes);

module.exports = router;