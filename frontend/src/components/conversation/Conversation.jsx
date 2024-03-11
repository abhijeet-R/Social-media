import  './conversation.css'
import axios from "axios";
import { useEffect, useState } from "react";

function Conversation({conversation , currentUser}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
        <img src={ user?.profilePicture
            ? user.profilePicture
            : "person/noAvatar.png"} alt="" className="conversationImg" />
        <span className="conversationText">{user?.username}</span>
    </div>
  )
}

export default Conversation