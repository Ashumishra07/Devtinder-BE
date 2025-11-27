
const { userMiddleware } = require("../middlewares/auth.middleware");
const express = require('express')
const profileRouter =express.Router();


profileRouter.get('/profile', userMiddleware
    ,async (req,res) => {
    try{
        console.log("?profile1")
    const user =req.user;
    console.log("?profile2",user);
    
    // const cookies =req.cookies;
    // const{token } = cookies;
    // if(!token){
    //     throw new Error("INVALID TOKEN");
    // }

    // const decodedHash = await JWT.verify(token , "Ashutosh@2004mishra");
    // const{_id} = decodedHash ;
    
    // const user = await User.findById(_id);
    res.send(user);
    }
    catch{
        res.status(400).send("Somethinf!!!!")
        

    }
});

module.exports = profileRouter;