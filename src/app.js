// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const User = require("./models/user");
const {validateSignupData} = require("./utility/helper");
const bcrypt = require("bcrypt");
const cookieParser =require("cookie-parser");
const JWT = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res) =>{
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

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId:emailId });
        if (!user) {
            res.status(400).send("invalid emailId")
            throw new Error("INVALID credentials");
        };
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            // create a jwt token
            const token = await JWT.sign({_id: user._id},"Ashutosh@2004mishra")
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
app.get('/profile',async (req,res) => {
    const cookies =req.cookies;
    const{token } = cookies;
    if(!token){
        throw new Error("INVALID TOKEN");
    }

    const decodedHash = await JWT.verify(token , "Ashutosh@2004mishra");
    const{_id} = decodedHash ;
    
    const user = await User.findById(_id);
    res.send(user);
})

// GEt user by email
app.get("/user", async(req,res) => {
    const user = req.body.email;
    try{
        const users = await User.findOne({email:user});
        if(!users){
            res.status(404).send("Email is not valid or user not exists");
        }
        else{
            res.send("User get successfully by email");
        }
    }
    catch(error){
        console.error("Someting went wrong:"+err.message);

    }
    
});

// GET user -GET/feed find
app.get("/feeds",async(req,res) => {
     const user2 = req.body.email;
     try{
        const findusers = await User.find({email:user2});
        console.log(findusers);
        if(findusers.length === 0){
            res.status(404).send("NOT GETTING USER IN MY FEED ....");
        }
        else{
            // res.send("USER IS VISIBLE IN MY FEED");
            res.send(findusers)
        }
     }
     catch(error){
        console.error("SOMETHING WENT WRONG :"+error.message);
       
     }
});
// Api for updating a user by id
app.patch("/user",async(req,res) =>{
    const userId =req.body.userId;
    const newss = req.body;
    try{
     const user =await User.findByIdAndUpdate(userId,newss);
     res.send("User updated successfully");
    }
     catch(error){
        console.error("SOMETHING WENT WRONG :"+error.message);
       
     }
});


// Api for updating a user by id
// app.patch("/user",async(req,res) =>{
//     const email = req.body.email;
//     const newss = req.body;
//     try{
//      const user =await User.findByIdAndUpdate(email,newss);console.log(user)
//      res.send("User updated successfully by email");
//     }
//      catch(error){
//         console.error("SOMETHING WENT WRONG :"+error.message);
       
//      }
// });

// Api for deleting a user by id
app.delete("/user",async (req,res) => {
    const userID = req.body.userId;
    try{
        const deleteduser = await User.findByIdAndDelete(userID);
        console.log(deleteduser);
        res.send("Deleted a User successfully by Id");
    }
    catch(error){
        console.error("Something wewnt wrong :"+error.message);
    }
})
connectDB()
  .then(() =>{
    console.log("Database connection established ....");
    app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
});

})
.catch((err) =>{
     console.error("Database cannot established...")
})

 





