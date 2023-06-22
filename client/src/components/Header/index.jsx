import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logOut, selectIsAuth } from "../../redux/slices/auth";
import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { UserInfo } from "../UserInfo";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  console.log(isAuth);
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout ?")) {
      window.localStorage.removeItem("token");
      dispatch(logOut());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MY BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {/* {isAuth && (
              <Avatar
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                sx={{ width: 36.5, height: 36.5, bgcolor: deepOrange[500] }}
              >
                {data ? data.fullName.charAt(0) : ""}
              </Avatar>
            )} */}
            {isAuth && <UserInfo {...data} />}
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create a post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
