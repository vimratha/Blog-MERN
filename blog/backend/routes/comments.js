const express=require('express')
const router=express.Router()
const user=require('../modules/user')
const post=require('../modules/post')
const comment=require('../modules/comment')
const verifyToken = require('../verifytoken')
const bcrypt=require('bcrypt')
//create
router.post("/create",async(req,res)=>
{
    try{
        const newComment=new comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})
//update
router.put("/:id",verifyToken,async(req,res)=>
{
    try{
       const updatedcomment=await comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       res.status(200).json(updatedcomment)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})
//delete
router.delete("/:id",async(req,res)=>
    {
        try{
            await comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment has been deleted")
        }
        catch(err)
        {
            res.status(500).json(err)
        }
    })
 
//get post comments
    router.get("/post/:postId",async(req,res)=>
        {
            try {
                const comment3= await comment.find({postId:req.params.postId})
                res.status(200).json(comment3)
            } 
        catch (err)
            {
           res.status(500).json(err)
            }
                
            
        })  

module.exports=router