import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { UserContext } from "../context/UserContext"
import { URL } from "../url"
import ProfilePorts from "./ProfilePorts"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {  useNavigate, useParams } from "react-router-dom"


const Profile = () => {
 const param=useParams().id
  const[username,setusername]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const [updated,setupdated]=useState(false)
  const {user,setuser }=useContext(UserContext)
  const [posts,setposts]=useState([])
  const navigate=useNavigate()

  const fetchProfile=async()=>
    {
      try
      {
              const res=await axios.get(URL+"/api/users/"+user._id)
              console.log(res.data.username)
              setusername(res.data.username)
              setemail(res.data.email)
              setpassword(res.data.password)
      }
      catch(err){
        console.log(err)
      }
    }

 useEffect(()=>
      {
        fetchProfile()
      },[param])

const handleUserUpdate=async()=>
{
  setupdated(false)
  try
  {
     const res = await axios.put(URL+"/api/users/"+user._id,{username,email,password})
     console.log(res.data)
     setupdated(true)
  }
  catch(err)
  {
    console.log(err)
    setupdated(false)
  }
}

const handleUserDelete=async()=>
  {
    try
    {
      const res=await axios.delete(URL+"/api/users/"+user._id)
      setuser(null)
      console.log(res)
      navigate("/")
    }

    catch(err)
    {
      console.log(err)
    }
  }

const fetchUserPosts=async()=>
  {
    try
    {
            const res=await axios.get(URL+"/api/posts/user/"+user._id)
            setposts(res.data)
            
    }
    catch(err)
    {
      console.log(err)
    }
  }
  useEffect(()=>
    {
      fetchUserPosts()
    },[param])
  return (
    <div>
      <Navbar/>
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start md:px-5">
         <div className="flex flex-col md:w-[70%] w-full md:mr-23">
        <h1 className="text-xl font-bold mt-5">Your Posts</h1>
       {posts?.map((p)=>
       (      <ProfilePorts key={p._id} p={p} />
       ))}
         </div>
         
         <div className="flex flex-col space-y-4  md:w-[30%] w-full md:pl-7">
            <h1 className="text-xl font-bold mb-4 ml-3 ">Profile</h1>
            <input onChange={(e)=>setusername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text"/>
            <input onChange={(e)=>setemail(e.target.value)} value={ email } className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="text"/>
          { /*<input onChange={(e)=>setpassword(e.target.value)} value="" className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="text"/> */}
         <div className="flex items-center space-x-4 mt-8">
           <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:bg-gray-500 ml-5">Update</button>
           <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:bg-gray-500">Delete</button>
        </div>
         {updated?<h3>User updated Successfully</h3>:null}
         </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Profile
