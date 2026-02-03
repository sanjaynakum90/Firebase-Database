import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/userSlice";

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
