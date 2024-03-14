import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";

const Btable = () => {
  const [Data, setData] = useState([]);

  // Sample data for demonstration
  const sampleData = [
    {
      budget: "Budget 1",
      entry_date: "2022-03-15",
      expenditure: "Expenditure 1",
      particulars: "Particulars 1",
      indenter: "Indenter 1",
      indent_no: "IND-001",
      PO_no: "PO-001",
      indent_amount: 1000,
      amount: 500,
      accounthead: "Account Head 1"
    },
    {
      budget: "Budget 2",
      entry_date: "2022-03-16",
      expenditure: "Expenditure 2",
      particulars: "Particulars 2",
      indenter: "Indenter 2",
      indent_no: "IND-002",
      PO_no: "PO-002",
      indent_amount: 2000,
      amount: 1000,
      accounthead: "Account Head 2"
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">BudgetList</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Budget</th>
              <th className="px-6 py-3 text-left">Entry Date</th>
              <th className="px-6 py-3 text-left">Expenditure</th>
              <th className="px-6 py-3 text-left">Particulars</th>
              <th className="px-6 py-3 text-left">Indenter</th>
              <th className="px-6 py-3 text-left">Indent No</th>
              <th className="px-6 py-3 text-left">PO No</th>
              <th className="px-6 py-3 text-left">Indent Amount</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Account Head</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleData.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.entry_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.expenditure}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.particulars}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.indenter}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.indent_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.PO_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.indent_amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.accounthead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Btable;