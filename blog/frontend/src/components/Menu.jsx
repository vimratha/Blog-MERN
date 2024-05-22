import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import {URL} from "../url"

const Menu = () => {
const {user}=useContext(UserContext)
const {setuser}=useContext(UserContext)
const navigate=useNavigate()

const handlelogout=async()=>
    {
     try{
         const res =await axios.get(URL+'/api/auth/logout',{withCredentials:true})
         console.log(res)
         setuser(null)
         navigate('/login')
     }
     catch(err)
     {
      console.log(err)
     }
    }
  return (
    <div className="bg-black flex flex-col items-start absolute top-12 right-8 rounded-md w-[150px] pl-4">
      {user?  <div>
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>
      <h3 onClick={handlelogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>

      </div>:<div><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/Login">Login</Link></h3>
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/Register">Register</Link></h3></div>}
     
    </div>
  )
}

export default Menu
