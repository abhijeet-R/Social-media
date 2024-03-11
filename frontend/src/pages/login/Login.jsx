import { useRef } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { loginCall } from "../../apicalls";
import { useDispatch } from 'react-redux'

function Login() {
  const email = useRef()
  const password = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit=  (e) =>{
      e.preventDefault()
       loginCall({email:email.current.value , password:password.current.value},dispatch)
  }
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">connect with your friends and the world</span>
        </div>
        <div className="loginRight" >
            <form className="loginBox" onSubmit={handleSubmit}>
                <input placeholder="Email" required type="email" className="loginInput" ref={email} />
                <input placeholder="Password" required type="password" className="loginInput" ref={password} />
                <button className="loginButton" type="submit">Log In</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton" onClick={()=>navigate('/register')}>create new account</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
