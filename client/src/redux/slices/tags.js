import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  const { data } = await axios.get(`/tags`);
  return data;
});

const initialState = {
  tags: {
    items: [],
    status: "loading",
  },
};

const TagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
  },
});

export const TagsReducer = TagsSlice.reducer;
