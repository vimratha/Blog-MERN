const express=require('express');
const router=express.Router()
const user=require('../modules/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post("/register",async(req,res)=>
{
    try{
         const {username,email,password}=req.body
         const salt=await bcrypt.genSalt(10)
         const hashedPassword=await bcrypt.hashSync(password,salt)
         const newuser=new user({username,email,password:hashedPassword})
         const saveduser=await newuser.save()
         res.status(200).json(saveduser)

    }
    catch(err){
        res.status(500).json(err)

    }
})
router.post("/login",async(req,res)=>
{
    try{
          const user1=await user.findOne({email:req.body.email})
          console.log(user1);
          if(!user1)
          {
            return res.status(500).json("user not found")
          }
          const match=await bcrypt.compare(req.body.password,user1.password)
          if(!match)
          {
            return res.status(401).json("wrong credentials")
          }
          const token=jwt.sign({_id:user1._id,username:user1.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
          const {password,...info}=user1._doc
          res.cookie("token",token).status(200).json(info)
          
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})
router.get("/logout",async(req,res)=>
{
    try{
          res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("user loggged out successfully")
    }
    catch(err){
     res.status(500).json(err)
    }
})
//refretch
router.get("/refetch",(req,res)=>
{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async(err,data)=>
    {
        if(err)
            {
             return res.status(403).json(err)
            }
        res.status(200).json(data)
    })
})
module.exports=router