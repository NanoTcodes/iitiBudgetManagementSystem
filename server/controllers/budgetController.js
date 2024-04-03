import Equipment from "../models/Equipment.js";
import Consumable from "../models/Consumable.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const updateEntry = async (req, res) => {
  try {
    const { username, year, type, indent_type, indent } = req.body;

    console.log(indent);

    let table;
    if (type == 0) table = await Consumable.findOne({ username, year });
    else table = await Equipment.findOne({ username, year });
    if (!table) {
      return res.status(400).json({
        error: "Dept does not exist, contact Admin to add the department",
      });
    }
    let { indents_process, direct_purchase } = table;

    if (!indent_type) {
      const index = indents_process.findIndex(
        (item) => item.indent_no === indent.indent_no
      );
      console.log(index);

      if (index === -1) {
        table.indents_process.push(indent);
        table.in_process += indent.indent_amount;
        table.expenditure += indent.indent_amount;
      } else {

        const { status, amount, indent_amount } = indents_process[index];
        console.log(indent, indents_process[index]);

        if (!indent.status) {
          table.in_process += indent.indent_amount;
          if (!status) table.in_process -= indent_amount;
          table.expenditure +=
            indent.indent_amount - (status ? amount : indent_amount);
        } else {
          // in_process -= indent_amount;
          table.expenditure +=
            indent.amount - (status ? amount : indent_amount);
          if (!status) table.in_process -= indent_amount;
        }
        table.indents_process[index] = indent;
      }
    } else {
      const index = direct_purchase.findIndex(
        (item) => item.indent_no === indent.indent_no
      );
      if (index === -1) {
        if (!indent.amount) indent.amount = indent.indent_amount;
        table.direct_purchase.push(indent);
        table.expenditure += indent.amount;
      } else {
        if (!indent.amount) indent.amount = indent.indent_amount;
        table.expenditure += indent.amount - direct_purchase[index].amount;
        table.direct_purchase[index] = indent;
        console.log(table.direct_purchase[index]);
      }
    }
    console.log(table.expenditure);
    const { expenditure, in_process } = table;
    await table.save();
    return res.json({ expenditure, in_process });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

//==========================================================================================
//fetching budget data
export const fetchTable = async (req, res) => {
  try {
    const { username, type, year } = req.query;
    console.log(username, year, type);
    let table;
    if (type == 1) table = await Equipment.findOne({ username, year });
    else table = await Consumable.findOne({ username, year });
    if (!table) {
      return res.status(400).json({
        error: " Data not found!",
      });
    }
    let { indents_process, direct_purchase, expenditure, in_process } = table;
    console.log(table);
    return res.json({
      expenditure,
      in_process,
      indents_process,
      direct_purchase,
    });
    // return res.json({
    //   department: department,
    //   budget: budget,
    //   expenditure: expenditure,
    //   year: year,
    //   indents_process: indents_process,
    //   direct_purchase: direct_purchase,
    //   // indent_pay_done: indent_pay_done,
    // });
    // }
    // else {
    //   let table = await Consumable.findOne({ username, year });
    //   if (!table) {
    //     return res.status(400).json({
    //       error: " Data not found!",
    //     });
    //   }
    //   let { indents_process, direct_purchase } = table;
    //   return res.json({
    //     indents_process,
    //     direct_purchase,
    //   });
    // return res.json({
    //   department: department,
    //   budget: budget,
    //   expenditure: expenditure,
    //   year: year,
    //   indents_process: indents_process,
    //   direct_purchase: direct_purchase,
    //   // indent_pay_done: indent_pay_done,
    // });
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

// {"department_name":"Department of Computer Science and Engineering",
// "budget_type":"Equipment"
// }
//==================================================

//summary
export const fetchSummary = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  const year = req.query.year;
  try {
    const con_departments = await Consumable.find({ year });
    const con_result = [];
    for (const con of con_departments) {
      con_result.push({
        username: con.username,
        name: con.department,
        budget: con.budget,
        expenditure: con.expenditure,
        indents_process: con.indents_process,
        in_process: con.in_process,
      });
    }
    const eq_departments = await Equipment.find({ year });
    const eq_result = [];
    for (const eq of eq_departments) {
      eq_result.push({
        username: eq.username,
        name: eq.department,
        budget: eq.budget,
        expenditure: eq.expenditure,
        indents_process: eq.indents_process,
        in_process: eq.in_process,
      });
    }
    return res.json({ con_result, eq_result });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

//THIS WILL DELETE THE DATABASE , DONT USE

//DONT USE AT ALL

export const deleteAll = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    await Consumable.deleteMany({});
    await Equipment.deleteMany({});
    await User.deleteMany({ role: 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

// localhost:5000/api/budget/fetchsummary?year=2023
