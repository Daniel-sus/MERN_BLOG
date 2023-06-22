import React from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

import styles from "./UserInfo.module.scss";
import { useNavigate } from "react-router-dom";

export const UserInfo = ({ _id, avatarUrl, fullName, additionalText }) => {
  const navigate = useNavigate();

  const handleOpenProfile = async (userId) => {
    try {
      navigate(`/profile/${userId}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.root}>
      {avatarUrl ? (
        <img
          onClick={() => handleOpenProfile(_id)}
          className={styles.avatar}
          src={avatarUrl}
          alt={fullName}
        />
      ) : (
        <Avatar
          onClick={() => handleOpenProfile(_id)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sx={{
            width: 30,
            height: 30,
            marginRight: "10px",
            bgcolor: deepOrange[500],
          }}
        >
          {fullName.charAt(0)}
        </Avatar>
      )}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
