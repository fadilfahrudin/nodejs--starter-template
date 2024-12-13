const express = require('express');
const userRoutes = require('./userRoutes.js');
const router = express();

router.use('/users', userRoutes);

module.exports = router;