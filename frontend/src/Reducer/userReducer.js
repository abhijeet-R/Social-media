// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = true;
    },
    follow: (state, action) => {
      state.user.followings.push(action.payload);
    },
    unfollow: (state, action) => {
      state.user.followings = state.user.followings.filter(following => following !== action.payload);
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, follow, unfollow } = userSlice.actions;

export default userSlice.reducer;
