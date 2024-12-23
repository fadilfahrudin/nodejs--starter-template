const express = require('express');
require('dotenv').config(); // Load environment variables
const cookieParser = require('cookie-parser'); // Cookie parser middleware
const cors = require('cors'); // CORS middleware
const errorHandler = require('./middlewares/errorHandler.js'); // Global error handler
const routers = require('./routes/index.js'); // All routes
const app = express();
const port = process.env.PORT;

// Middleware untuk JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk cookie parser
app.use(cookieParser());

// Middleware untuk CORS
app.use(cors());

// Routes
app.use(routers);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Global Error Handler (letakkan setelah semua route)
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
