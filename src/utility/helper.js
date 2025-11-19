const validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;
    console.log("##@22##***#######");
    if(!firstName || !lastName){
        throw new Error("Invalid Name Enter");

    }
    else if(!validator.isEmail(emailId) ){
        throw new Error("INVALID emailID ADDDED");
    }
    else if(!validator.isStrongPassword(password)){
        console.log("#####PASS####***###");
        throw new Error("WEAK PASSWORD ENTERED..")
    }

}

module.exports ={ validateSignupData}
    
