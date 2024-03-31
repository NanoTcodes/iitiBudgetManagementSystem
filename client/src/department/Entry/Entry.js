import React, { useContext, useState } from "react";
import YearContext from "../../contexts/year/YearContext";

const Entry = ({ props }) => {
  const { indent } = props;
  indent.status = 0;
  const { year } = useContext(YearContext);
  const {
    i,
    entry_date,
    particulars,
    indenter,
    indent_no,
    po_no,
    indent_amount,
    amount,
    remark,
    status,
    type,
  } = indent;
  const statusArr = ["Indent in Process", "Indent Payment Done"];

  let date;
  if (entry_date) date = new Date(entry_date).toDateString();
  else date = new Date().toDateString();

  return (
    <>
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{type ? "Direct Purchased" : statusArr[status]}</td>
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
        <td>{remark}</td>
        <td>
          <button
    
          >
            Edit
          </button>
          <button
            onClick={() => {
              alert("Will be implemented soon.");
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Entry;
