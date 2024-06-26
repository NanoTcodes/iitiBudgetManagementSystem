import User from "../models/User.js";
import Equipment from "../models/Equipment.js";
import Consumable from "../models/Consumable.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import authMiddleware from "../middlewares/authMiddleware.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    let user;
    const { email } = req;
    console.log(email);
    if (email) {
      user = await User.findOne({ email });
      console.log(user)
      if (!user)
        return res.status(400).json({ error: "You are not registered!" });
    } else {
      user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
    }
    const { name, role } = user;
    const data = { user: { username:user.username, role } };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ user: { username, name, role }, authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

//======================================================================
//this is useful in creating the dept and not in adding entry

//side note-- in front end give options of equipment budget category and also array_name in both, DON'T take direct user input

//sample request --
// "department":"CSE",
// "budget":9000000,
// "expenditure":0,
// "year":2022,
// "indents_process":[],
// "direct_purchase":[],
// "indent_pay_done":[]

//=========
//adding entry in consumable
//the entry also adds to the expenditure

export const allUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const users = await User.find({});
    console.log(users);
    // const users_arr=[];
    // for(let user of users){
    //   users_arr.push(user);
    // }
    return res.json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};
