import React, { useContext, useEffect, useState } from "react";
import DepartmentContext from "../../contexts/department/DepartmentContext";
import YearContext from "../../contexts/year/YearContext";
import AlertContext from "../../contexts/alert/AlertContext";
import Entry from "../Entry/Entry";

const Home = () => {
  const { department } = useContext(DepartmentContext);
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
      const { indents_process, direct_purchase } = json;
      setIndents({
        inProcess: indents_process,
        directPur: direct_purchase,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

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
        headers: { "Content-type": "application/json" },
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
    if (json.error) unSuccessful(json.error);
    else {
      successful("Entry updated succesfully!");
      const { expenditure, in_process } = json;
      setTotal({ expenditure, inProcess: in_process });
      return 1;
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
            <th colSpan="3">Expenditure</th>
            <th colSpan="3">Indents in Process</th>
            <th colSpan="1">Fund Available</th>
            <th colSpan="2">Percent Utilised</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">{budget}</td>
            <td colSpan="3">{total.expenditure}</td>
            <td colSpan="3">{total.inProcess}</td>
            <td colSpan="1">{budget - total.expenditure}</td>
            <td colSpan="2">
              {((total.expenditure / budget) * 100).toFixed(2)}%
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
          </tr>
          {indents.inProcess.length ? (
            indents.inProcess.map((indent, i) => {
              indent.i = i;
              indent.type = 0;
              return <Entry props={indent} key={i} />;
            })
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Indents in Process
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="8" className="font-weight-bold">
              Total
            </td>
            <td>total.inProcess.indAmount</td>
            <td>total.inProcess.amount</td>
            <td colSpan={2}></td>
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
          </tr>
          {indents.directPur.length ? (
            indents.directPur.map((indent, i) => {
              indent.i = i;
              indent.type = 1;
              return <Entry props={indent} key={i} />;
            })
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Direct Purchases
              </td>
            </tr>
          )}{" "}
          <tr>
            <td colSpan="8" className="font-weight-bold">
              Total
            </td>
            <td>total.directPur.indAmount</td>
            <td>total.directPur.amount</td>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Home;
