import { configureStore } from "@reduxjs/toolkit";
import { PostsReducer } from "./redux/slices/posts";
import { AuthReducer } from "./redux/slices/auth";
import { TagsReducer } from "./redux/slices/tags";
import { CommentsReducer } from "./redux/slices/comments";

const store = configureStore({
  reducer: {
    posts: PostsReducer,
    tags: TagsReducer,
    comments: CommentsReducer,
    auth: AuthReducer,
  },
});

export default store;
