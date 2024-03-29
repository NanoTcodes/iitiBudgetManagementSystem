import express from "express";
import { body } from "express-validator";
import { createUser, addDept, increase_budget,newyear, removeUser, updateUser } from "../controllers/adminController.js";
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
  "/adddept",
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
  addDept
);

router.post(
  "/increaseBudget",
  increase_budget
)

router.post(
  "/newYear",
  newyear
)

router.post(
  "/removeUser",
  removeUser
)

router.post(
  "/updateUser",
  updateUser
)


export default router;
