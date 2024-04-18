import express from "express";
import { login,allUsers} from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    body("username", "Username should not be empty!").exists(),
    body("password", "Password should not be empty!").exists(),
  ],
  login
);

// router.post("/forgotPassword",forgotPassword)

router.get("/allUsers",allUsers);


export default router;

