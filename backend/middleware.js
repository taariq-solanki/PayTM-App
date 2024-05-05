const jwtSecret = require("./config")
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const tokenHead=req.headers.authorization
    if (tokenHead && tokenHead.startsWith('Bearer ')) {
        const token=tokenHead.split(' ')[1]
        console.log(1)
        try{
            const decoded=jwt.verify(token,jwtSecret)
            userId=decoded.userId
            //console.log(userId +"heelo")

            req.userId=userId
            
         
        //return res.json({msg:"done"})
        console.log(2)

        }
        catch{
            console.log(3)
            return res.status(403).json({msg:"an error occured"})

        }
        
    }
    else{
        res.status(403).json({msg:"an error occured 121"})
    }
    
    next()
}
module.exports={authMiddleware}