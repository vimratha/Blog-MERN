const express=require('express')
const router=express.Router()
const user=require('../modules/user')
const post=require('../modules/post')
const comment=require('../modules/comment')
const bcrypt=require('bcrypt')
const verifyToken = require('../verifytoken')
//create
router.post("/create",verifyToken,async(req,res)=>
{
    try{
        const newPost=new post(req.body)
        const savedpost=await newPost.save()
        res.status(200).json(savedpost)
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
       const updateduser=await post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       res.status(200).json(updateduser)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})
//delete
router.delete("/:id",verifyToken,async(req,res)=>
    {
        try{
            await post.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            await comment.deleteMany({postId:req.params.id})
            res.status(200).json("post has been deleted")
        }
        catch(err)
        {
            res.status(500).json(err)
        }
    })
 //get post details
  router.get("/:id",async(req,res)=>
{
    try {
        const post1= await post.findById(req.params.id)
        res.status(200).json(post1)
    } 
catch (err)
    {
   res.status(200).json(err)
    }
        
    
})  
//get all posts
router.get("/",async(req,res)=>
    {
        const query=req.query
        try {
            const searchfilter={
                title:{$regex:query.search,$options:'i'}  
            }
            const post2= await post.find(query.search?searchfilter:null)
             return res.status(200).json(post2)
        } 
    catch (err)
        {
     return   res.status(200).json(err)
        }
            
        
    })  
//get particular user posts
    router.get("/user/:userid",async(req,res)=>
        {
            try {
                const post3= await post.find({userid:req.params.userid})
                res.status(200).json(post3)
            } 
        catch (err)
            {
           res.status(200).json(err)
            }
                
            
        })  
  

module.exports=router