import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Profile() {

  const [user,setUser] = useState({})
  const username = useParams().username;

  useEffect(()=>{
    const fetchUsers = async()=>{
      const res = await axios.get(`/users/?username=${username}`)
      setUser(res.data)
    }
    fetchUsers()
  },[username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture} alt="" className="profileCoverImg" />
              <img src={user.profilePicture || "/assets/person/noAvatar.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
