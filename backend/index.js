const express = require("express");
const { User } = require("./db");
const mainRouter = require("./routes");
const userRouter = require("./routes/user");
const cors=require('cors')
const jwt=require("jsonwebtoken");
const { accountRouter } = require("./routes/account");


const app=express()


app.use(cors())
app.use(express.json());

app.use('/api/v1',mainRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/account',accountRouter)

app.listen(3000)