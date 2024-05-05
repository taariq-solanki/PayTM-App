const express=require('express');
const { userValid } = require('../schema');
const {User,UserAccount} = require('../db');
const jwtSecret = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const app=express()
const userRouter=new express.Router()

userRouter.post('/signup',async function(req,res){
    try{
        const userInfo=req.body;
        const validity=userValid.safeParse(req.body)
        if(validity.success==false){
          return  res.json({msg:"invalid inputs"})
        }

        const userFind=await User.findOne({username:userInfo.username})
        
        if(userFind){
           return res.json({
                msg:"user already exists"
            })
        }
        
        const user=  await User.create({
            username:userInfo.username,
            password:userInfo.password,
            firstname:userInfo.firstname,
            lastname:userInfo.lastname,
        })
        const userId=user._id
        const userAccount=await UserAccount.create({
            userId:userId,
            balance:Math.ceil(Math.random()*10000)
        })

        
        const token=jwt.sign({userId},jwtSecret)
        
        res.status(200).json({msg:"user created",
                    token:token})
        
    }
    catch{
        res.status(400).json({
            msg:"something went wrong"
        })

    }
})

userRouter.post('/signin',async function(req,res){
    const userInfo=req.body;
    const existingUser=await User.findOne({username:userInfo.username,password:userInfo.password})
    
    if (existingUser){
        const userId=existingUser._id
        const token =jwt.sign({userId},jwtSecret)
        // console.log(existingUser.firstname)
        return res.status(200).json({token:token,
            msg:"signin done"}
            )
        
    }
    res.status(411).json({msg:"error while logging in"})
})

userRouter.put('/',authMiddleware,async function(req,res){
    const userId=req.userId;
    const userDataToBeChanged=req.body
    try{
        await User.findOneAndUpdate({_id:userId},userDataToBeChanged)
        res.json({msg:"Updated successfully"})
}   catch{
     res.status(411).json({
        message: "Error while updating information"
    })
}
    
    
})

userRouter.post('/me',authMiddleware,async function(req,res){
    res.status(200).json({})
})

userRouter.get('/bulk',async function(req,res){
    const filter=req.query.filter || ""
    try{
        // console.log(2)
    const user=await User.find({$or:[{firstname:{"$regex":filter}},{lastname:filter}]})
    // console.log(1)
    res.json({
        users:user.map(i=>({
            firstname:i.firstname,
            lastname:i.lastname,
            username: i.username,
            _id:i._id

        }))
    })
    }
    catch{
        res.json({msg:"user not found"})
    }    
})
//function userIdConverter(tokenHead){
  //  const token=tokenHead.split(' ')[1]
    //const userId=jwt.verify(token,jwtSecret)
        
//}
module.exports=userRouter;