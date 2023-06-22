import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = () => {
  const { data } = axios.get();
  return data;
};

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
};

const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const CommentsReducer = CommentsSlice.reducer;
