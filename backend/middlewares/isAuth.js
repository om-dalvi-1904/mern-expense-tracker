let jwt = require("jsonwebtoken")

let isAuthenticated = async(req,res,next)=>{
    //* get the token
    let headerObject = req.headers.authorization
    let token = headerObject.split(" ")[1]
    //* verify the token
    let verifyToken = jwt.verify(token,"expense-tracker",(err, decoded)=>{
        if(err){
            return false
        }else{
            return decoded
        }
    })
    if(verifyToken){
        // console.log(verifyToken.id);
        req.user = verifyToken.id
        // console.log(req.user);
        next()
    }else{
        let err = new Error("Token expired.")
        next(err)
    }
}

module.exports = isAuthenticated