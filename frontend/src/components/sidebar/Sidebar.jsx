import "./sidebar.css";
import {Link} from "react-router-dom"
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
const [Users,setUSers] = useState([])
  useEffect(()=>{
      const getAllUsers = async ()=>{
        try{
        const users=await axios.get("/users/all")
         setUSers(users.data)
      }catch(err){
        console.log(err)
      }
    }
      getAllUsers()
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users && Users.map((u) => (
            <Link key={u.username} to={"/profile/" + u.username} style={{ textDecoration: "none" }} >
            <CloseFriend key={u._id} user={u} />
            </Link>
          ))}
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}

export default Sidebar;
