import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be at least 5 letters long").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("fullName", "FullName must be at least 3 letters long").isLength({
    min: 2,
  }),
  body("password", "Password must be at least 5 letters long").isLength({
    min: 5,
  }),
  body("avatarUrl", "Invalid link").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter article title")
    .optional()
    .isLength({ min: 3 })
    .isString(),
  body("text", "Enter article text").optional().isLength({ min: 3 }).isString(),
  body("tags", "Wrong tag format").optional().isString(),
  body("imageUrl", "Invalid image link").optional().isString(),
];
