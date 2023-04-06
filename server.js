const express = require('express');
const dotenv = require('dotenv')

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3000';

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */
app.get('/', (req, res) => {
    res.status(200).send("This is not why you're Headers. Head to /user/:id and replace :id with user id")
})

const userRouter = require('./routes/user');
app.use('/user', userRouter);

/**
 * Start listening
 */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})