import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const Index = ({ post, setPost }) => {
  const { data } = useSelector((state) => state.auth);
  const { fullName, avatarUrl, _id } = data;
  const { id } = useParams();

  const [inputValue, setInputValue] = React.useState("");

  const onHandleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreateComment = async () => {
    try {
      const { data } = await axios.post(`/posts/${id}/comments`, {
        postId: id,
        comment: {
          userId: _id,
          fullName: fullName,
          avatarUrl: avatarUrl,
          text: inputValue,
        },
      });
      setInputValue("");
      setPost({ ...post, comments: [...post.comments, data] });
    } catch (error) {
      alert("Error creating a comment");
    }
  };

  return (
    <>
      <div className={styles.root}>
        {avatarUrl ? (
          <img className={styles.avatar} src={avatarUrl} alt={fullName} />
        ) : (
          <Avatar
            classes={{ root: styles.avatar }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            sx={{
              width: 40,
              height: 40,
              marginRight: "15px",
              bgcolor: deepOrange[500],
            }}
          >
            {data.fullName && fullName.charAt(0)}
          </Avatar>
        )}
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={inputValue}
            onChange={(e) => onHandleChangeInput(e)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={() => handleCreateComment()} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
