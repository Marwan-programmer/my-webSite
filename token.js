const jwt=require("jsonwebtoken");

const creatToken=(id,email)=>{
return jwt.sign(
    {id:id 
        ,email:email
    }
    
    ,"MarMohTah",

)

}

module.exports={creatToken}
