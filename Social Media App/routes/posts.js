const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin=require('../middleware/require_login')
const Post=mongoose.model("Post")

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body}=req.body
    if(!title||!body){
        res.status(422).json({error:"please add all fields"})
    }
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router