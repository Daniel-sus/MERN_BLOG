import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import axios from "../../axios";
import { Upload } from "@mui/icons-material";

export const Registration = () => {
  const [firstName, setFirstName] = React.useState("");
  const inputFileRef = React.useRef(null);
  const [iconUrl, setIconUrl] = React.useState("");
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Vlad",
      email: "test@test.gmail.com",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    window.localStorage.setItem("token", data.payload.token);
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload/icon", formData);
      setIconUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error loading a file");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar
            onClick={() => inputFileRef.current.click()}
            sx={{ width: 80, height: 80 }}
          >
            {iconUrl ? (
              <img
                className={styles.image}
                src={`http://localhost:4444${iconUrl}`}
                alt="Uploaded"
              />
            ) : firstName ? (
              firstName.charAt(0).toUpperCase()
            ) : (
              <Upload />
            )}
          </Avatar>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          {!iconUrl && <div>upload your avatar</div>}
        </div>
        <TextField
          {...register("fullName", { required: "Укажите имя" })}
          className={styles.field}
          onChange={(event) => setFirstName(event.target.value)}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
        />
        <TextField
          {...register("email", { required: "Укажите имя" })}
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
