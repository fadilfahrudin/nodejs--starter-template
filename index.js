const express = require('express');
const morgan = require('morgan');
require("dotenv/config.js"); // Load environment variables
const cookieParser = require('cookie-parser'); // Cookie parser middleware
const cors = require('cors'); // CORS middleware
const errorHandler = require('./middlewares/errorHandler.js'); // Global error handler
const routers = require('./routes/index.js'); // All routes
const app = express();
const port = process.env.PORT;

const fs = require("fs");
const path = require("path");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a", // Tambahkan log baru tanpa menimpa log lama
});

// Middleware untuk JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Middleware untuk cookie parser
app.use(cookieParser());

// Middleware untuk CORS
// Array of allowed origins
const allowedOrigins = process.env.CORS_ALLOWED_ORIGIN.split(',');

app.use(cors({
    origin: (origin, callback) => {
        if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin)) {
            console.log(`CORS check passed for origin: ${origin || 'unknown'}`);
            callback(null, true);
        } else {
            console.log(`CORS check failed for origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Log
app.use(morgan("combined", { stream: accessLogStream }));

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
