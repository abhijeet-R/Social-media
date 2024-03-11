import "./post.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useSelector((state) => state.user);

  const likeHandler =async() => {
    try {
      const res = await axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
       if(res.status===200){
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
        }
    } catch (err) {}
   
  };

  const handleDelete = async () => {
    try {
      console.log(post.userId)
      console.log(currentUser._id)
      console.log(user._id)
      await axios.delete("/post/" + post._id, { userId: currentUser._id });
    } catch (err) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || "/assets/person/noAvatar.png"}
                alt="img"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {user._id == currentUser._id ? (
              <button onClick={handleDelete} className="delete-button">
                <MdDelete />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
