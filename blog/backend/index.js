const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const multer=require('multer')
const cookieparser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const path=require("path")
const connectDB=async()=>
{
    try{
         await mongoose.connect(process.env.MONGO_URL)
         console.log("database is connected suceessfully")
    }
    catch(err){
        console.log(err)
    }
}

dotenv.config()
app.use(express.json())
app.use(cookieparser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:8000",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

const storage=multer.diskStorage({
    destination:(req,file,fn)=>
        {
            fn(null,"images")

        },
        filename:(req,file,fn)=>
            {
                fn(null,req.body.img)
            }
})
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>
{
    res.status(200).json("image has been uploaded successfully")
})
app.listen(process.env.PORT,()=>
{
    connectDB()
    console.log("app is running on "+process.env.PORT)
})