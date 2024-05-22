import {Link} from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {URL} from "../url"
const Register = () => {
  const [username,setusername]=useState("")
  const [password, setpassword] = useState("")
  const [email,setemail]=useState("")
  const [error,seterror]=useState("")
  const navigate= useNavigate()

  const handleregister=async()=>
  
    {
      try{
         const res=await axios.post(URL+"/api/auth/register",{username,email,password})
         setusername(res.data.username)
         setpassword(res.data.email)
         setemail(res.data.email)
         seterror(false)
         navigate("/login")
      }
      catch(err)
      {
        seterror(true)
        console.log(err)
      }
    }
 
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl font-extrabold"><Link to ="/">Blog </Link></h1>
      <h3><Link to="/login">Login</Link></h3>
      </div>
    <div className="w-full flex justify-center items-center h-[110vh]">
    <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-left">Create an Account</h1>
        
        <input onChange={(e)=>setusername(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-lg" type="text" placeholder="Enter your username"/>
        <input onChange={(e)=>setemail(e.target.value)}className="w-full px-4 py-2 border-2 border-black rounded-lg" type="text" placeholder="Enter your email"/>
        <input onChange={(e)=>setpassword(e.target.value)}className="w-full px-4 py-2 border-2 border-black rounded-lg" type="text" placeholder="Enter your password"/>
        <button onClick={handleregister} className="w-full px-4 py-4 text-lg font-bold  text-white bg-black rounded-lg hover:bg-gray-500 text-green">Register</button>
        {error ?<h3>There is some error</h3> : null}
        <div className="flex justify-center items-center space-x-4">
     <p className=" text-base text-gray-400 font-normal">Already have an account ?</p>
     <p><Link to="/Login">Login</Link></p>
    </div>
    </div>
   
    </div>
    <Footer/>
    </>
  )
}

export default Register
