import React, { useContext, useState } from "react";
import YearContext from "../../contexts/year/YearContext";
import "./entry.css";

const Entry = ({ initialIndent }) => {
  const { year } = useContext(YearContext);
  const [edit, setEdit] = useState(0);
  const [indent, setIndent] = useState(initialIndent);
  indent.status = 0;
  indent.id = 0;
  const {
    i,
    entry_date,
    particulars,
    indenter,
    indent_no,
    po_no,
    indent_amount,
    amount,
    account_head,
    status,
    id,
  } = indent;
  const statusArr = ["Indent in Process", "PO Raised", "Indent Payment Done"];
  const years = [2023, 2323];

  let date;
  if (entry_date) date = new Date(entry_date).toDateString();
  else date = new Date().toDateString();
  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setIndent({ ...indent, [name]: value });
  };

  return edit ? (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>
        <select name="status" value={status} onChange={handleOnChange}>
          {statusArr.map((status, i) => {
            return <option>{status}</option>;
          })}
        </select>
      </td>
      <td>{date}</td>
      <td>
        <input
          onChange={handleOnChange}
          name="particulars"
          value={particulars}
        ></input>
      </td>
      <td>
        {year}-{(year % 100) + 1}
      </td>
      <td>
        <input
          value={indenter}
          onChange={handleOnChange}
          name="indenter"
        ></input>
      </td>
      <td>
        <input
          value={indent_no}
          onChange={handleOnChange}
          name="indent_no"
          type="number"
          required
        ></input>
      </td>
      <td>
        <input
          value={po_no}
          onChange={handleOnChange}
          name="po_no"
          type="number"
        ></input>
      </td>
      <td>
        <input
          value={indent_amount}
          onChange={handleOnChange}
          name="indent_amount"
          type="number"
        ></input>
      </td>
      <td>
        <input
          value={amount}
          onChange={handleOnChange}
          name="amount"
          type="number"
        ></input>
      </td>
      <td>
        <input
          value={account_head}
          onChange={handleOnChange}
          name="account_head"
        ></input>
      </td>
      <td>
        <button onClick={() => setEdit(0)}>Submit</button>
      </td>
    </tr>
  ) : (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{statusArr[status]}</td>
      <td>{date}</td>
      <td>{particulars}</td>
      <td>
        {year}-{(year % 100) + 1}
      </td>
      <td>{indenter}</td>
      <td>{indent_no}</td>
      <td>{po_no}</td>
      <td>{indent_amount}</td>
      <td>{amount}</td>
      <td>{account_head}</td>
      <td>
        <button onClick={() => setEdit(1)}>Edit</button>
      </td>
    </tr>
  );
};

export default Entry;
