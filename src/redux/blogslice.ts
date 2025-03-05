import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  date: "",
  image: "",
  content: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;