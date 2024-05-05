const express= require('express');
const { authMiddleware } = require('../middleware');

const app=express();
const mainRouter=new express.Router;


module.exports=mainRouter;