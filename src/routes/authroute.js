
const {validateSignupData} = require("../utility/helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const express = require('express')
const authRouter = express.Router();
const getJWT = require("../models/user");
const validatePassword = require("../models/user");



// authRouter.post("/signup",async(req,res) =>{
//     try {

//         // Validate request body
//         console.log("####333333444**##")
//         const validBody = validateSignupData(req);
//         console.log("#log", validBody);

//         const { firstName, lastName, emailId, password,gender,about,age,photourl } = req.body;

//         //    Encrypt password in db
//         const hashPassword = await bcrypt.hash(password, 10);
//         console.log("#logf2", hashPassword);


//         console.log("#####*******##########");
//         const user = new User({
//             firstName, lastName, emailId, password: hashPassword,
//         });
//         console.log("user", JSON.stringify(user, null, 2));

//         await user.save();
//         res.send("User created Successfully...");
//     }
//     catch (error) {
//         res.status(400).send("USer is not created:" + error.message);
//     }
// });

authRouter.post("/signup", async (req, res) => {
  try {
    console.log("STEP 1: Request received");

    const { firstName, lastName, emailId, password } = req.body;

    console.log("STEP 2: Data parsed");

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("STEP 3: Password hashed");

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    console.log("STEP 4: User created");

    await user.save();
    console.log("STEP 5: User saved");

    res.send("User created Successfully...");
  } catch (error) {
    console.error("ERROR:", error);
    res.status(400).send("User not created: " + error.message);
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
            res.cookie("token",token,{
                httpOnly: true,
                // secure: true,       // Set true in production (HTTPS)
                // sameSite: "strict",
            })
            res.send(user);
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

// authRouter.post('/logout',async(req,res) =>{
//     res.cookie("token",null,
//         {expires:new Date(Date.now())});

//     res.send("Logout Successfully!!!!");
// });

authRouter.post('/logout', async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token",{
            httpOnly: true,
            secure: true,       // Set true in production (HTTPS)
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed, try again."
        });
    }
});



module.exports = authRouter;