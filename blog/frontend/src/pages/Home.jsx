import { URL } from "../url";
import axios from "axios";
import Footer from '../components/Footer';
import HomePoster from '../components/HomePoster';
import Navbar from '../components/Navbar';
import { useEffect, useState ,useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search}=useLocation()
  const[noresult,setnoresult]=useState(false)
  const {user}=useContext(UserContext)

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/"+search);
      console.log(res.data);
      console.log(search)
      setPosts(res.data);
      if(res.data.length==0)
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
    fetchPosts();
  }, [search]);

  return (
    <>
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
      <Footer />
    </>
  );
};

export default Home;
