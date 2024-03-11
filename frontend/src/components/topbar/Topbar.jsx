import { FaSearch } from "react-icons/fa";
import {
  IoIosNotificationsOutline,
  IoIosLogOut,
} from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../Reducer/userReducer";

function Topbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loginStart());
    try {
      dispatch(loginSuccess(null));
      localStorage.removeItem("user");
    } catch (err) {
      dispatch(loginFailure(err));
    }
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FaSearch />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <FaMessage />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <IoIosNotificationsOutline />
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem">
            <span onClick={handleLogout}>
              <IoIosLogOut />
            </span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/assets/person/noAvatar.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
