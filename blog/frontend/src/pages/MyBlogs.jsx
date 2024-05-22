
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserContext } from "../context/UserContext"
import { URL } from "../url"
import { Link,useLocation,useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import HomePoster from '../components/HomePoster'
const MyBlogs = () => {
  const param=useParams().id
  const [posts, setPosts] = useState([]);
  //const {search}=useLocation()
  const[noresult,setnoresult]=useState(false)
  const {user}=useContext(UserContext)
 
  const fetchPosts = async () => {
    try {
     // console.log(search)
      const res = await axios.get(URL+"/api/posts/user/"+user._id);
      console.log(res.data);
      setPosts(res.data);
      if(res.data.length===0)
        {
          setnoresult(true)
        }
      else
      {
        setnoresult(false)
      }
    } catch (err) {
      console.log(err);
    
    }
  };

  useEffect(() => {
    fetchPosts()
  }, [param])

return (
  <div>
    <Navbar />
    <div className='pr-8'>
        {
          noresult?
        <h3 className="text-center font-bold mt-20">No Posts are available</h3>:posts.map((post) => 
        <>
         <Link to={user?`/posts/post/${post._id}`:"/login"}>
         <HomePoster key={post._id} post={post}/>
         </Link>
         </>
         )}
      </div>
    <Footer/>
  </div>
)
}
export default MyBlogs
