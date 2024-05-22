import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import Comment from "./Comment"
import {  useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { URL,IF } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";


const Postdetails = () => {
const [post,setpost]=useState({})
const postId=useParams().id
const navigate =useNavigate()
const {user}=useContext(UserContext)
const [comments,setcomments]=useState([])
const[comment,setcomment]=useState("")

console.log(postId)
  const fetchPost =async()=>
    {
      try
      {
         const res=await axios.get(URL+"/api/posts/"+postId)
         setpost(res.data)
        }
      catch(err)
      {
        console.log(err)
      }
    }

    const handledelete=async()=>
      {
        try
        {
           const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
           console.log(res.data)
                navigate("/")
        }
        catch(err)
        {
          console.log(err)
        }
      }
    useEffect(()=>
    {
      fetchPost()
    },[postId])

    const fetchpostcomment=async()=>
      {
        try
        {
           const res=await axios.get(URL+"/api/comments/post/"+postId)
           console.log(res.data)
           setcomments(res.data)
        }
        catch(err)
        {
          console.log(err)
        }
      }
  
  useEffect(()=>
  {
    fetchpostcomment()
  },[postId])
  
 const postComment=async(e)=>{
  e.preventDefault()
 const data=
 {
  comment:comment,
  author:user.username,
  postId:postId,
  userid:user._id
}

  try{
    
      const res=await axios.post(URL+"/api/comments/create",data)
      console.log(res.data)
     fetchpostcomment()
     setcomment("")
     window.location.reload(true)
     
  }
  catch(err)
  {
    console.log(err)
  }
 }

    return (
    <div>
      <Navbar/>
      <div className="px-8 md:px-[200px] mt-8">
<div className="flex justify-between items-center">
<h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
{user?._id===post?.userid?<div className="flex items-center justify-center space-x-2">
<p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit /></p>
<p className="cursor-pointer" onClick={handledelete}><MdDelete /></p>
</div>:
null}
</div>
<div className="flex items-center justify-between mt-2 md:mt-4">
<p>{post.username}</p>
        <div className="flex space-x-2">
        <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
</div>
</div>
<img src={IF+post.photo} className="w-full mx-auto mt-8" alt=""/>
<p className="mt-5 text-bold">{post.desc}</p>
      <div className="flex items-center mt-8 space-x-4 font-semibold">
<p>Categories:</p>
<div className="flex justify-center items-center space-x-2 ">
{post.categories?.map((posts,i)=>
(
  <div key={i} className="bg-gray-300 rouned-lg px-3 py-1">{posts}</div>
))
}
  

      </div>
    </div>
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
     {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post} />
     ) )}
      </div>
      <div className="w-full flex flex-col mt-4 md:flex-row">
        <input onChange={(e)=>setcomment(e.target.value)} type="text" placeholder="Write a comment" className="outline-none px-4 mt-4 md:mt-0"/>
        <button onClick={postComment} className="bg-black text-sm text-white px-4 py-2 md:w-[10%] mt-4" >Add Comment</button>
      </div>
      </div>
      <Footer/>
    
    </div>
  )
}

export default Postdetails
