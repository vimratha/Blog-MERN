import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ImCross } from "react-icons/im";
import { useEffect, useState , useContext } from "react";
import axios from 'axios';
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPage = () => {
  const postId=useParams().id
  const {user}=useContext(UserContext)
  const[title,settitle]=useState("")
  const[desc,setdesc]=useState("")
  const[file,setfile]=useState(null)
        const [cat,setCat]=useState("");
        const [cats,setCats]=useState([]);
        const navigate=useNavigate()
       

        const fetchpost=async()=>
          {
            try
            {
               const res=await axios.get(URL+"api/posts/"+postId)
               settitle(res.data.title)
               setdesc(res.data.desc)
               setfile(res.data.photo)
               setCats(res.data.categories)

            }
            catch(err)
            {
              console.log(err)
            }
          }

          const handleclick=async(e)=>
            {
              e.preventDefault()
              const post={
               title,
               desc,
               username:user.username,
               userid:user._id,
               categories:cats
              }
       
       if(file)
         {
           const data=new FormData()
           const filename=Date.now()+file.name
           data.append("img",filename)
           data.append("file",file)
           post.photo=filename
   
           try{
             const imgupload= await axios.post(URL+"/api/upload",data)
             console.log(imgupload)
            }
            catch(err)
            {
              console.log(err)
            }
         }
         try{
         const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
         navigate("/posts/post/"+res.data._id)
         console.log(res.data)
   
     
         }
         catch(err)
         {
           console.log(err)
         }
        
            }

          useEffect(()=>
            {
              fetchpost()
            },[postId])

      const addcategory=()=>
      {
          let updatedcats=[...cats]
          updatedcats.push(cat)
          setCat("")
          setCats(updatedcats)
    
      }
      const deletecategory=(i)=>
      {
      
        setCats(prev =>
        {
          return prev.filter(
            (item,index)=>
            {
          return index!==i;
            }
          )
        })
      }
  return (
    
       <div>
      <Navbar/>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8 ml-3 pb-5">Update a Post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8">
        <input onChange={(e)=>settitle(e.target.value)} value={title} type="text" placeholder="Enter your post title" className="px-4 py-2 outline-none"/>
        <input onChange={(e)=>setfile(e.target.files[0])} type="file" className="px-4"/>
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter your category" type="text"/>
            <div onClick={addcategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
          </div>
          <div className="flex px-4 mt-3">
          {cats.map((item,i)=>(
            <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
            <p>{item}</p>
            <p onClick={()=>
            {
              deletecategory(i);
            }} className="text-white bg-black rounded-full cursor-pointer"><ImCross/></p>
            </div>
            
      ))}
         
          </div>     
            </div>
            <textarea onChange={(e)=>setdesc(e.target.value)} value={desc} rows={15} cols={30} className="px-4 py-2 outline-none" placeholder="Enter post description"/>
            <button onClick={handleclick} className="bg-black w-full mx-auto text-white font-semibold px-4 py-2 md:text-xl ">Update</button>
        </form>
      </div>
      <Footer/>
    </div>
  )}

export default EditPage
