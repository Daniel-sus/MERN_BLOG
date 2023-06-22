import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { UserController, PostController, ProfileController } from "./controllers/index.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DataBase"))
  .catch((err) => console.log("DataBase Error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/upload/icon", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getLastTags);
app.get("/tag/:name", PostController.getOneTag);

app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.post("/posts/:id/comments", checkAuth, PostController.createComment);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.delete("/posts/:id", checkAuth, PostController.remove);

// Profile logic

app.get("/profile/:id", ProfileController.getUserProfile);

app.listen(4444, (err) => {
  if (err) {
    return console.log("server didn't start");
  }
  console.log("Server started successfully");
});
