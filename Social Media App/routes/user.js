const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin=require('../middleware/require_login')
const Post=mongoose.model("Post")
const User=mongoose.model("User")

router.get('/user/:id',requirelogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err)
            return res.status(422).json({error:err})
            res.send({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"user not found"})
    })
})


router.put('/follow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
      },
      {new:true}
      ).select("-password")
      .then(result=>{
          res.json(result)
      })
      .catch(err=>{
          return res.status(422).json({error:err})
      })
    })
})

router.put('/unfollow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.followId}
      },
      {new:true}
      ).select("-password")
      .then(result=>{
          res.json(result)
      })
      .catch(err=>{
          return res.status(422).json({error:err})
      })
    })
})

router.put('/updatepic',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({error:"pic cannot post"})
        }
        res.json(result)
    })
})


module.exports=router