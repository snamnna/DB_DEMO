const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');

//Get request to retrieve user by id
router.get('/:id', async function(req, res) {
    try {
        const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//POST request to hande user login
router.post('/register', async function(req,res){
    try{
        const {email, password} = req.body;

        //Tämä liittyy salasanan encryptaamiseen
        //const encryptedPassword = await bcrypt.hash(password, 10);

        const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [email, password]);
        res.status(200).json({userId: result.insertId});
    }catch(error){
        res.status(400).send(error.message)
    }
})

//Compare passwords (tämä sanoo aina "valid_password: false")
router.post('/login', async function(req,res) {
    try{
        const {id, password} = req.body;
        const sqlGetUser = 'SELECT password FROM user WHERE id=?';
        const rows = await pool.query(sqlGetUser,id);
        if(rows){
            const isValid = await bcrypt.compare(password, rows[0].password)
            res.status(200).json({valid_password: isValid})
        }
        res.status(200).send(`User with id ${id} was not found`);
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router;