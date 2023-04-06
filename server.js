const express = require('express');

const PORT = process.env.PORT || '3000';

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Start listening
 */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})