import "./share.css";
import { MdLabel, MdEmojiEmotions, MdPermMedia ,MdCancel } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios"

function Share() {
  const { user } = useSelector((state) => state.user);
  const desc = useRef()
  const [file,setFile] = useState(null)
 
  const  handleChange= (e)=>{
    setFile(e.target.files[0])
    }
  

  const submitHandler = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      file: file
    };
    console.log(newPost)
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture || "/assets/person/noAvatar.png"}
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username} ? share your thoughts ...`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <MdCancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file"  className="shareOption">
              <MdPermMedia className="shareIcon" />
              <span  className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleChange}
              />
            </label>
            <div className="shareOption">
              <MdLabel className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FaLocationDot className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;
