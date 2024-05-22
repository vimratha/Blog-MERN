const express=require('express')
const router=express.Router()
const user=require('../modules/user')
const post=require('../modules/post')
const comment=require('../modules/comment')

const bcrypt=require('bcrypt')
router.put("/:id",async(req,res)=>
{
    try{
        console.log(req.body.password);
        if(req.body.password)
        {
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        console.log(req.params.id);
        console.log(req.body);
        const updatedUser=await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
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
            await user.findByIdAndDelete(req.params.id)
            await post.deleteMany({userid:req.params.id})
            await comment.deleteMany({userid:req.params.id})
            res.status(200).json("user has been deleted")
        }
        catch(err)
        {
            res.status(500).json(err)
        }
    })
 //get user
 /*router.get("/:id",async(req,res)=>
{
    try {

        console.log(req.params.id)
        const user=await user.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //const {password,...info}=user._doc
        res.status(200).json(user)
    } 
catch (err)
    {
   res.status(500).json(err)
    }
        
    
})  */
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("User ID:", userId);

        const user1 = await user.findById(userId);
        if (!user1) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Details:", user1);
        const {password,...info}=user1._doc
        res.status(200).json(info)
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});
module.exports=router