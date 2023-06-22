import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "/posts/fetchPosts",
  async (params) => {
    const { sortBy } = params;
    const { data } = await axios.get(`/posts?sortBy=${sortBy}`);
    return data;
  }
);

export const removePost = createAsyncThunk("/posts/removePost", async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
});

export const fetchOneTag = createAsyncThunk("/tag/fetchTag", async (name) => {
  const { data } = await axios.get(`/tag/${name}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
};

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchOneTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchOneTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchOneTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [removePost.pending]: (state) => {
      state.posts.status = "loading";
    },
    [removePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
      state.posts.status = "loaded";
    },
    [removePost.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const PostsReducer = PostsSlice.reducer;
