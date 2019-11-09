const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.post('/register', (req, res)=>{

    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    const newUser = new UserModel(formData);

    // Step 1. Generate a salt (random data for adding complexity)
    bcrypt.genSalt((err, salt)=>{
        if(err) {
            console.log('error is', err);
        }
        
        // Step 2. Generate a hashed password using (a) the user's password
        // and (b) the salt
        bcrypt.hash(
            newUser.password,
            salt,
            (err, hashedPassword)=>{
                if(err) {
                    console.log('error is', err);
                }
                
                // Step 3. Reassign the user's password to be hashed password
                newUser.password = hashedPassword;

                // Step 4. Saving the formData to the database

                newUser
                .save() // Promise

                // If promise is fulfilled
                .then( 
                    (newUserData)=>{
                        // Send response in the form of JSON
                        res.json(newUserData)
                    }
                )
                // Otherwise...
                .catch(
                    (err)=>{
                        console.log('error', err);
                    }
                )
            }
        )
    });
});



module.exports = router;