const authMiddleware=(req,res,next)=>{
    const token= "xyz";
    const isAdminAuthorized = token === "xyz";
   
    if(isAdminAuthorized){
        console.log("Admin is authorized");
        next();
    }
    else{
        err.message =undefined
        res.status(401).send("Unauthorized access"+err.message); 
    }
};

const userMiddleware=(req,res,next)=>{
    const token= "xyz";
    const isAdminAuthorized = token === "xyz";
   
    if(isAdminAuthorized){
        console.log("User is authorized");
        next();
    }
    else{
        err.message =undefined
        res.status(401).send("Unauthorized access"+err.message); 
    }
};



module.exports={ 
    authMiddleware,userMiddleware};
    
