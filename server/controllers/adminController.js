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
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    const { username, name, role } = req.body;
    user = await User.create({
      username,
      name,
      password: secPass,
      role,
    });
    res.json({ success: "User has been created!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};

//===============================================================================

export const addDept = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const {
      username,
      name,
      password,
      cons_budget,
      cons_expenditure,
      equip_budget,
      equip_expenditure,
      year,
    } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }
    let entry = await Consumable.create({
      username,
      department: name,

      budget:cons_budget,
      expdenditure:cons_expenditure,

      year,
      indents_process: [],
      direct_purchase: [],
    });
    let entry2 = await Equipment.create({
      username,
      department: name,

      budget:equip_budget,
      expenditure:equip_expenditure,
      year,
      indents_process: [],
      direct_purchase: [],
    });
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(password, salt);
    const role = 0;
    user = await User.create({
      username,
      name,
      password: secPass,
      role,
    });
    res.json({ success: "Department has been created!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

//{     "username":"cse2",
// "password":"password",
// "name":"CSE245",
// "budget":9000000,
// "expenditure":3444440,
// "in_process":0,
// "year":2022
// }


export const increase_budget=async(req,res)=>{
  try{const {username,budget_type,new_amount,year}=req.body;
    let table;
    if(budget_type=="Equipment"){
      table=await Equipment.findOne({username,year});
    }
    else{
      table=await Consumable.findOne({username,year});
    }
    console.log(table)
    const old_amount=table.budget;
    table.budget=new_amount;
    const indent={remark:`previous budget was ${old_amount}, increased to ${new_amount} by admin`};
    console.log(indent)
    table.indents_process.push(indent);
    table.direct_purchase.push(indent);
    await table.save();
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
}