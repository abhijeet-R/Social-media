import "./register.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios"

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/");
      } catch (err) {
        console.log(err);
      }
  }
}
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            connect with your friends and the world
          </span>
        </div>
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              placeholder="username"
              required
              type="text"
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              type="password"
              className="loginInput"
              ref={password}
            />
            <input
              placeholder="confirm password"
              type="password"
              required
              className="loginInput"
              ref={confirmPassword}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log in to account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
