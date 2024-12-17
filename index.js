const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const routers = require('./routes/index.js');

// Middleware untuk JSON
app.use(express.json());
// Middleware untuk URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser)
app.use(cors)

// routes
app.use(routers)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// end routes

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

