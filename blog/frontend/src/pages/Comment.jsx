//import {BiEdit} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import { URL } from "../url"
import axios from "axios"
import { useContext} from "react"
import { UserContext } from "../context/UserContext"

const Comment = ({c,post}) => {

  const {user} = useContext(UserContext)
  const deleteComment=async(i)=>
    {
      try
      {
         await axios.delete(URL+"/api/comments/"+i)
         window.location.reload(true)
      }
      catch(err)
      {
        console.log(err)
      }
    }
  return (
    <div>
       <div className="py-2 px-2 bg-gray-200 rounded-lg mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-grey-600">@{c.author}</h3>
          <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
          {user?._id===post?.userid? <div className="flex items-center justify-center space-x-2">
             <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete /></p>
            </div>:null}
           
          </div>
        </div>
        <p className="px-4 mt-2">{c.comment}</p>
        </div>
    </div>
  )
}

export default Comment
