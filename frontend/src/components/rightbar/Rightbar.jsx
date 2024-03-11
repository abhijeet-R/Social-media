import "./rightbar.css";
import Online from "../online/Online"
import {useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { RiAddLine } from "react-icons/ri";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import {follow , unfollow} from '../../Reducer/userReducer'


function Rightbar({user}) {
 const dispatch = useDispatch()
  const [friends, setFriends] = useState([])
  const {user:currentUser} =useSelector((state)=>state.user)
  const [followed, setFollowed] = useState(true)

  const handleClick =async () => {
    try {
      setFollowed(currentUser?.followings.includes(user?._id))
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch(unfollow());
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(follow());
      }
      setFollowed(!followed);
    } catch (err) {
    }
  }
  useEffect(()=>{
setFollowed(currentUser?.followings.includes(user?._id))
  },[user,followed,currentUser])


  useEffect(()=>{
    const getFriends= async()=>{
      try{
       const friendList = await axios.get(`/users/friends/${user? user._id : currentUser._id}`)
       setFriends(friendList.data);
      }catch(err){
        console.log(err)
      }
    }
    getFriends()
  },[user,currentUser])

  const HomeRightbar = () => {
    return <>
      <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>pola Foster</b> and <b>3 ather friends </b>have birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">online friends</h4>
        <ul className="rightbarFriendList">
        {friends.map(friend =>  (<Link key={friend.username} to={"/profile/" + friend.username} style={{ textDecoration: "none" }} >
        <Online key={friend._id} user={friend}/>
            </Link>))}
        </ul>
    </>
  }

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <IoIosRemoveCircleOutline /> : <RiAddLine />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link key={friend.username} to={"/profile/" + friend.username} style={{ textDecoration: "none" }} >
              <div className="rightbarFollowing">
                <img src={friend.profilePicture? friend.profilePicture: "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };


  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
       {user ? <ProfileRightbar /> :  <HomeRightbar /> }
      </div>
    </div>
  );
}

export default Rightbar;
