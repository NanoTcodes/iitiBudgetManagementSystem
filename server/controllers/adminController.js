import User from "../models/User.js";
import { validationResult } from "express-validator";
import Consumable from "../models/Consumable.js";
import Equipment from "../models/Equipment.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, password, role, name } = req.body;
    console.log(req.body);
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(password, salt);
    user = await User.create({
      username,
      name,
      password: secPass,
      role,
    });
    if (role == 0) {
      const date = new Date();
      let year = date.getFullYear();
      if (date.getMonth() < 3) year--;
      let entry = await Consumable.create({
        username,
        department: name,
        budget: 0,
        expdenditure: 0,
        year,
        indents_process: [],
        direct_purchase: [],
      });
      let entry2 = await Equipment.create({
        username,
        department: name,
        budget: 0,
        expenditure: 0,
        year,
        indents_process: [],
        direct_purchase: [],
      });
    }
    res.json({ success: "User has been created!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};

//===============================================================================

// export const addDept = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const {
//       username,
//       name,
//       password,
//       cons_budget,
//       cons_expenditure,
//       equip_budget,
//       equip_expenditure,
//       year,
//     } = req.body;

//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ error: "Username already exists!" });
//     }
//     let entry = await Consumable.create({
//       username,
//       department: name,

//       budget: cons_budget,
//       expdenditure: cons_expenditure,

//       year,
//       indents_process: [],
//       direct_purchase: [],
//     });
//     let entry2 = await Equipment.create({
//       username,
//       department: name,

//       budget: equip_budget,
//       expenditure: equip_expenditure,
//       year,
//       indents_process: [],
//       direct_purchase: [],
//     });
//     const salt = await bcrypt.genSalt(10);
//     let secPass = await bcrypt.hash(password, salt);
//     const role = 0;
//     user = await User.create({
//       username,
//       name,
//       password: secPass,
//       role,
//     });
//     res.json({ success: "Department has been created!" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Some error occured!");
//   }
// };

//{     "username":"cse2",
// "password":"password",
// "name":"CSE245",
// "budget":9000000,
// "expenditure":3444440,
// "in_process":0,
// "year":2022
// }
