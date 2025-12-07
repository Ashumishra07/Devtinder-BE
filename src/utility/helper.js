const validator = require('validator');
const User = require('../models/user');

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

};

const validateEditProfileData = (req,res) => {
    const allowedFieldsData =["firstName","skills","password","education","age"];

  const isEditAllowed= Object.keys(req.body).every((fields) =>allowedFieldsData.includes(fields));
  return isEditAllowed;
}

module.exports ={ validateSignupData,validateEditProfileData}
    
