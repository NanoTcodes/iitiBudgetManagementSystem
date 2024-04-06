import React, { useContext, useEffect, useState } from "react";
import DepartmentContext from "../../contexts/department/DepartmentContext";
import "./department.css";
import YearContext from "../../contexts/year/YearContext";
import AlertContext from "../../contexts/alert/AlertContext";
import Entry from "../Entry/Entry";

const Department = () => {
  const { department, setDepartment } = useContext(DepartmentContext);
  const { year } = useContext(YearContext);
  const { unSuccessful, successful } = useContext(AlertContext);
  const { name, budget, expenditure, in_process, username, type } = department;
  const initialIndents = {
    inProcess: [],
    directPur: [],
  };
  const [indents, setIndents] = useState(initialIndents);
  const [indentActive, setIndentActive] = useState(0);
  const [total, setTotal] = useState({ expenditure, inProcess: in_process });
  const [update, setUpdate] = useState(0);
  const [newAmount, setNewAmount] = useState("");
  const blankIndent = {
    entry_date: new Date(),
    particulars: "",
    indenter: "",
    indent_no: "",
    po_no: "",
    indent_amount: 0,
    amount: 0,
    remark: "",
    status: 0,
  };

  const fetchData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/budget/fetchtable?username=${username}&type=${type}&year=${year}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
      setIndents(initialIndents);
    } else {
      const { indents_process, direct_purchase, expenditure, in_process } =
        json;
      setIndents({
        inProcess: indents_process,
        directPur: direct_purchase,
      });
      setTotal({ expenditure, inProcess: in_process });
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  const addEntry = async (type) => {
    if (!type) {
      let inProcess = indents.inProcess;
      inProcess.push(blankIndent);
      setIndents({ ...indents, inProcess });
    } else {
      let directPur = indents.directPur;
      directPur.push(blankIndent);
      setIndents({ ...indents, directPur });
    }
  };

  const submitIndent = async (indent) => {
    let match;
    let { indent_no } = indent;
    indent_no = indent_no == "" ? 0 : parseInt(indent_no);
    if (!indent_no) {
      unSuccessful("Indent number can't be empty");
      return 0;
    }
    if (indent.type)
      indents.directPur.map((indent) => {
        if (indent.indent_no == indent_no && indent_no != indentActive)
          match = 1;
      });
    else
      indents.inProcess.map((indent) => {
        if (indent.indent_no == indent_no && indent_no != indentActive)
          match = 1;
      });
    if (match) {
      unSuccessful("Indent number already exixts!");
      return 0;
    }
    let {
      status,
      particulars,
      indenter,
      po_no,
      indent_amount,
      amount,
      remark,
    } = indent;
    indent_amount = indent_amount == "" ? 0 : parseInt(indent_amount);
    amount = amount == "" ? 0 : parseInt(amount);
    status = status == "1" ? true : false;
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/budget/updateentry`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          username,
          year,
          type,
          indent_type: indent.type,
          indent: {
            status,
            particulars,
            indent_no,
            indenter,
            po_no,
            indent_amount,
            remark,
            amount,
          },
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.error) unSuccessful(json.error);
    else {
      successful("Entry updated succesfully!");
      const { expenditure, in_process } = json;
      setTotal({ expenditure, inProcess: in_process });
      return 1;
    }
  };

  const handleOnChange = async (e) => {
    setNewAmount(e.target.value);
  };

  const updateBudget = async () => {
    const new_amount = parseInt(newAmount);
    console.log(new_amount, username, type);
    console.log(localStorage.getItem("authToken"));
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/updatebudget`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, new_amount, type, year }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.error) unSuccessful(json.error);
    else {
      successful(json.success);
      setUpdate(0);
      setDepartment({ ...department, budget: new_amount });
    }
  };

  return (
    <>
      <h2 className="m-3 text-center">{name}</h2>
      <h3 className="m-3 text-center">
        {type ? "Equipment" : "Consumable"} Budget {year}-{(year % 100) + 1}
      </h3>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Budget (Rs.)</th>
            <th colSpan={3 - update}>Expenditure</th>
            <th colSpan="3">Indents in Process</th>
            <th colSpan="1">Fund Available</th>
            <th colSpan={2 - update}>Percent Utilised</th>
            {update === 1 && <th>Enter New Amount</th>}
            <th colSpan={1 + update}>Budget Control</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">{budget}</td>
            <td colSpan={3 - update}>{total.expenditure}</td>
            <td colSpan="3">{total.inProcess}</td>
            <td colSpan="1">{budget - total.expenditure}</td>
            <td colSpan={2 - update}>
              {((total.expenditure / budget) * 100).toFixed(2)}%
            </td>
            {update === 1 && (
              <td>
                <input
                  type="number"
                  value={newAmount}
                  onChange={handleOnChange}
                ></input>
              </td>
            )}
            {update === 1 && (
              <td>
                <button onClick={updateBudget}>Submit</button>
              </td>
            )}
            <td>
              {update ? (
                <button onClick={() => setUpdate(0)}>Cancel</button>
              ) : (
                <button onClick={() => setUpdate(1)}>
                  Update Allocated Budget
                </button>
              )}
            </td>
          </tr>
          <tr>
            <th colSpan={12} className="text-center">
              <h4>Indents in Process</h4>
            </th>
          </tr>
          <tr>
            <th>Sr. No.</th>
            <th>Status</th>
            <th>Entry Date</th>
            <th>Particulars</th>
            <th>Year</th>
            <th>Indenter</th>
            <th>Indent No.</th>
            <th>PO No.</th>
            <th>Indent Amount</th>
            <th>Amount (₹)</th>
            <th>Remarks</th>
            <th>Edit</th>
          </tr>
          {indents.inProcess.length ? (
            indents.inProcess.map((indent, i) => {
              indent.i = i;
              indent.type = 0;
              return (
                <Entry
                  props={{
                    initialIndent: indent,
                    submitIndent,
                    setIndentActive,
                  }}
                  key={i}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Indents in Process
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={12} className="text-center">
              <button className="btn btn-secondary" onClick={() => addEntry(0)}>
                Add new Indent
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={12}></td>
          </tr>
          <tr>
            <th colSpan="13">
              <h4 className="text-center">Direct Purchases</h4>
            </th>
          </tr>
          <tr>
            <th>Sr. No.</th>
            <th>Status</th>
            <th>Entry Date</th>
            <th>Particulars</th>
            <th>Year</th>
            <th>Indenter</th>
            <th>Indent No.</th>
            <th>PO No.</th>
            <th>Indent Amount</th>
            <th>Amount (₹)</th>
            <th>Remarks</th>
            <th>Edit</th>
          </tr>
          {indents.directPur.length ? (
            indents.directPur.map((indent, i) => {
              indent.i = i;
              indent.type = 1;
              return (
                <Entry
                  props={{
                    initialIndent: indent,
                    submitIndent,
                    setIndentActive,
                  }}
                  key={i}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Direct Purchases
              </td>
            </tr>
          )}{" "}
          <tr>
            <td colSpan={12} className="text-center">
              <button className="btn btn-secondary" onClick={() => addEntry(1)}>
                Add new Direct Purchase
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={12}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Department;
