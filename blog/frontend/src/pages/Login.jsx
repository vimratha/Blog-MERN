import {Link} from "react-router-dom"
import Footer from "../components/Footer"
import {useState,useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {URL} from "../url"
import { UserContext } from "../context/UserContext";
 export const Login = () => {
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[error,seterror]=useState("")
  const {setuser}=useContext(UserContext)
  const navigate= useNavigate()

  const eventhandler=async()=>
    {
      try{
       const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
    
       setuser(res.data)
         navigate("/")
      }
      catch(err)
      {
        seterror(true)
        console.log(err);
      }
    }

  return (
    <>
     <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl font-extrabold"><Link to ="/">Blog </Link></h1>
      <h3><Link to="/register">Register</Link></h3>
      </div>
    <div className="w-full flex justify-center items-center h-[110vh]">
    <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-left">Login to your account</h1>
        
        <input onChange={(e)=>setemail(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-lg" type="text" placeholder="Enter your email"/>
        <input onChange={(e)=>setpassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-lg" type="text" placeholder="Enter your Password"/>
        <button onClick={eventhandler} className="w-full px-4 py-4 text-lg font-bold  text-white bg-black rounded-lg hover:bg-gray-500 text-green">Log In</button>
        {error ?<h3>There is some error</h3> : null}
    <div className="flex justify-center items-center space-x-4">
     <p>New Here?</p>
     <p><Link to="/register">Register</Link></p>
    </div>
    </div>
      
    </div>
    <Footer/>
    </>
  )
}

