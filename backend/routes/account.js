const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { UserAccount, db, User } = require("../db");
const { transferSchema } = require("../schema");
const mongoose=require('mongoose')

const accountRouter=Router()

accountRouter.get('/balance',authMiddleware,async function(req,res){
    //console.log("here")
    const userId=req.userId
    //console.log(userId)

    const account=await UserAccount.findOne({userId:userId})
    const user=await User.findOne({_id:userId})
    // console.log(user.firstname)
    res.json({
        balance:account.balance,firstname:user.firstname,lastname:user.lastname
    })
})

accountRouter.post('/transfer',authMiddleware,async function(req,res){
    const transferInfo=req.body
    // const transferStatus=transferSchema.safeParse(transferInfo)
    // if(transferStatus.success==false){
    //     return res.json({msg:"invalid body"})
    // }
    
    const session=await mongoose.startSession()
    session.startTransaction();

    const receiverStatus= await UserAccount.findOne({userId:transferInfo.to}).session(session)
    // console.log(transferInfo)
    if(!receiverStatus){
        await session.abortTransaction()
        return res.json({msg:"invalid account"})
    }
    
    const senderStatus=await UserAccount.findOne({userId:req.userId}).session(session)
    if(senderStatus.balance<transferInfo.amount){
        await session.abortTransaction()
        return res.json({msg:"insufficient balance"})
    }

    const sender=await UserAccount.updateOne({userId:req.userId},{$inc:{balance:-transferInfo.amount}}).session(session)

    const receiver=await UserAccount.updateOne({userId:transferInfo.to},{$inc:{balance:transferInfo.amount}}).session(session)

    await session.commitTransaction();
    res.json({msg:"transaction succesfull"})
    

    
})

module.exports={accountRouter}