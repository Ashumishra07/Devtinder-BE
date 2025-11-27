
const {validateSignupData} = require("../utility/helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const express = require('express')
const authRouter = express.Router();




authRouter.post("/signup",async(req,res) =>{
    try {

        // Validate request body
        console.log("####333333444**##")
        const validBody = validateSignupData(req);
        console.log("#log", validBody);

        const { firstName, lastName, emailId, password } = req.body;

        //    Encrypt password in db
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("#logf2", hashPassword);


        console.log("#####*******##########");
        const user = new User({
            firstName, lastName, emailId, password: hashPassword,
        });
        console.log("user", JSON.stringify(user, null, 2));

        await user.save();
        res.send("User created Successfully...");
    }
    catch (error) {
        res.status(400).send("USer is not created:" + error.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId:emailId });
        if (!user) {
            res.status(400).send("invalid emailId")
            throw new Error("INVALID credentials");
        };
        const validPassword = await user.validatePassword(password);
        if (validPassword) {
            // create a jwt token
            const token = await user.getJWT();
            // Add the token to cookie snd send the response back to user
            res.cookie("token",token)
            res.send("Login Successful");
        }
        else if (!validPassword) {
            res.status(400).send("INVALID CREDENTIALS");
        }
    }
    catch (err) {
        res.status(400).send("error:",+ err.message)
        throw new Error(err.message);
    }
});

module.exports =authRouter;