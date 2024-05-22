import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoMdSearch } from "react-icons/io"
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu"
import { UserContext } from "../context/UserContext";

const Navbar = () => {

    const[prompt,setprompt]=useState("")
    const[menu,setmenu]=useState(false)
    const navigate=useNavigate()
    const path=useLocation().pathname
    //console.log(param)
    const showMenu=()=>
      {
        setmenu(!menu)
      }



  const {user}=useContext(UserContext)
  
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl font-extrabold"><Link to ="/">Blog </Link></h1>
  {path==="/"?  <div className="flex justify-center items-center space-x-0 ">
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><IoMdSearch /></p>
        <input onChange={(e)=>{setprompt(e.target.value)}} className="outline-none px-3 py-1" placeholder="Search a post" type="text"/>
      </div>:null}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3><Link to="/write">Write</Link></h3>:<h3><Link to="/login">Login</Link></h3>}
         {user ?<div><p onClick={showMenu} className="cursor-pointer "><FaBars /></p> {menu? < Menu/>:null}</div>:<h4><Link to="/Register">Register</Link></h4>} 
      </div>
      <div onClick={showMenu}className="md:hidden text-lg">
      <p className="cursor-pointer"><FaBars /></p>
      {menu? < Menu/>:null}
      </div>
      </div>
    
  )
}

export default Navbar;
