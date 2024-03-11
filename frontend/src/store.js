// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducer/userReducer'

export default configureStore({
  reducer: {
    user: userReducer
  }
});
