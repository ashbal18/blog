import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogslice"; // Add this line
import userSlice from "./userSlice";
import userMiddleware from "./userMiddleware";

export const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogReducer, 
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userMiddleware)
});


store.dispatch({type: "user/init" });
export type RootState = ReturnType<typeof store.getState>;
export type AppDsipatch = typeof store.dispatch;

export type BlogState = {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
};
