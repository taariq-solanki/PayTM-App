const { model } = require('mongoose')
const zod=require('zod')
const userValid =zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),

})

const transferSchema=zod.object({
    to:zod.string(),
    amount:zod.number()
})

module.exports={userValid,transferSchema}