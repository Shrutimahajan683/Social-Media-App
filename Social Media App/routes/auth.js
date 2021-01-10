const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const user=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../Keys')
const requirelogin=require('../middleware/require_login')


router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password)
    {
        res.status(422).json({error:"please add fields"})
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        user.findOne({email:email})
        .then((saveduser)=>{
            if(saveduser)
            {
                res.status(422).json({error:"user already exist with that email"})
            }
            const User=new user({
                email,
                password:hashedpassword,
                name
            })
            User.save()
            .then(User=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
    })
  
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(422).json({error:"please add email or password"})
    }
    user.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
           return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
                //res.json({meassage:"successfully signed in"})
                const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
         console.log(err);
        })
    })
})

module.exports=router