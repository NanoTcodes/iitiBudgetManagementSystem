import express from "express";
import { createUser, login } from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/createuser",
  [
    body("username", "Username should be atleast 2 characters long.").isLength({
      min: 2,
    }),
    body("name", "Name should be atleast 3 characters long. ").isLength({
      min: 5,
    }),
    body("password", "Password should be atleast 6 characters long.").isLength({
      min: 6,
    }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("username", "Username should not be empty!").exists(),
    body("password", "Password should not be empty!").exists(),
  ],
  login
);

export default router;

