
//import { BrowserRouter as Router, Route } from "react-router-dom";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import Register from "./pages/Register";
import Postdetails from "./pages/Postdetails";
import Createpost from "./pages/Createpost";
import EditPage from "./pages/EditPage";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    
     <UserContextProvider>
      <Routes>
     <Route exact path="/" element={<Home/>}/>
     <Route exact path="/Login" element={<Login/>}/>
     <Route exact path="/register" element={<Register/>}/>
     <Route exact path="/write" element={<Createpost/>}/>
     <Route exact path="/posts/post/:id" element={<Postdetails/>}/>
     <Route exact path="/edit/:id" element={<EditPage/>}/>
     <Route exact path="/profile/:id" element={<Profile/>}/>
     <Route exact path="/myblogs/:id" element={<MyBlogs/>} />
      </Routes>
     
      </UserContextProvider>
  )
}

export default App
