const Jstoken=require("jsonwebtoken");
const secretKey = "hardikvaghela";

const verifytoken=(req, res, next) => {
  
  const token= req.cookies.JsonwebToken;
  console.log(token);
  if(token){

   Jstoken.verify(token, secretKey, (err, authdata) => {
      if (err) {
        res.json({ err: err.message });
      } else {
        req.auth = authdata;
        next();
      }
    });

  }
  else{

    res.json({error:"Token is not found",IsToken:false})
  }

 
};

module.exports = verifytoken;
