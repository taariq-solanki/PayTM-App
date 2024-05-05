const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
})
const userAccountSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const db=mongoose.connect('mongodb+srv://admin:admin123@cluster0.uvpxgrw.mongodb.net/paytm')
const User=mongoose.model('User',userSchema)
const UserAccount=mongoose.model('UserAccount',userAccountSchema)



module.exports={User,UserAccount,db}