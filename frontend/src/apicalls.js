import { loginStart, loginSuccess, loginFailure } from './Reducer/userReducer'; 
import axios from "axios";

export const loginCall = async (userCredential,dispatch) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", userCredential);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data))
    } catch (err) {
      dispatch(loginFailure(err));
    }
};
