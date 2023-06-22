import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchOneTag } from "../redux/slices/posts";
import { fetchTags } from "../redux/slices/tags";
import { useParams } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { tags } = useSelector((state) => state.tags);
  const { commnets } = useSelector((state) => state.comments);
  const userData = useSelector((state) => state.auth.data);
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSortBy = (sort) => {
    setSortBy(sort);
  };

  React.useEffect(() => {
    if (name) {
      dispatch(fetchOneTag(name));
    } else {
      dispatch(fetchPosts({ sortBy }));
      // dispatch(fetchComments());
    }
  }, [sortBy, name]);

  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          value={0}
          onClick={() => handleSortBy("createdAt")}
          label="Most recent"
        />
        <Tab
          value={1}
          onClick={() => handleSortBy("viewsCount")}
          label="Popular"
        />
      </Tabs>
      {name && <h2># {name}</h2>}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(posts.status === "loading" ? [...Array(5)] : posts.items).map(
            (item, index) =>
              posts.status === "loading" ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={index}
                  id={item._id}
                  title={item.title}
                  imageUrl={
                    item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ""
                  }
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={item.comments && item.comments.length}
                  tags={item.tags}
                  isEditable={userData?._id === item.user._id}
                />
              )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={tags.status === "loading" && true}
          />
          {/* <CommentsBlock
            // items={comments.items}
            // items={[
            //   {
            //     user: {
            //       fullName: "Вася Пупкин",
            //       avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            //     },
            //     text: "Это тестовый комментарий",
            //   },
            //   {
            //     user: {
            //       fullName: "Иван Иванов",
            //       avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            //     },
            //     text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
            //   },
            // ]}
            isLoading={comments.status === "loading" ? true : false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
