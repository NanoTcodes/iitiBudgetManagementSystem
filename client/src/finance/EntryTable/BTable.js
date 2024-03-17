import React, { useContext, useEffect, useState } from "react";
import "./BTable.css";

const BTable = () => {
  return (
    <div>
      <h1>Budget Table</h1>
      <table>
        <thead>
          <tr>
            <th colspan="3">Budget (Rs.)</th>
            <th colspan="3">Expenditure</th>
            <th colspan="3">Balance Fund Available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">50,00,000</td>
            <td colspan="3">23,47,668</td>
            <td colspan="3">26,52,332</td>
          </tr>
          <tr>
            <th colspan="9">Indents in Process</th>
          </tr>
          <tr>
            <th>Entry Date</th>
            <th>Particulars</th>
            <th>Year</th>
            <th>Indenter</th>
            <th>Indent No.</th>
            <th>PO No.</th>
            <th>Indent Amount</th>
            <th>Amount (₹)</th>
            <th>Account Head</th>
          </tr>
          <tr>
            <td>21-Sep-23</td>
            <td>23-24</td>
            <td>419</td>
            <td>64,566</td>
            <td>64,566</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>25-Aug-23</td>
            <td>23-24</td>
            <td>367</td>
            <td>18,00,000</td>
            <td>18,00,000</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colspan="6">TOTAL</td>
            <td>20,25,600</td>
            <td>23,47,668</td>
            <td>-</td>
          </tr>
          <tr>
            <th colspan="9">Direct Purchase</th>
          </tr>
          <tr>
            <th>Entry Date</th>
            <th>Particulars</th>
            <th>Year</th>
            <th>Indenter</th>
            <th>Indent No.</th>
            <th>PO No.</th>
            <th>Indent Amount</th>
            <th>Amount (₹)</th>
            <th>Account Head</th>
          </tr>
          <tr>
            <td>-</td>
            <td>23-24</td>
            <td>96</td>
            <td>1,61,034</td>
            <td>1,61,034</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colspan="6">TOTAL</td>
            <td>20,25,600</td>
            <td>23,47,668</td>
            <td>-</td>
          </tr>
          <tr>
            <th colspan="9">Indent Payment Done</th>
          </tr>
          <tr>
            <th>Entry Date</th>
            <th>Particulars</th>
            <th>Year</th>
            <th>Indenter</th>
            <th>Indent No.</th>
            <th>PO No.</th>
            <th>Indent Amount</th>
            <th>Amount (₹)</th>
            <th>Account Head</th>
          </tr>
          {/* Insert Indent Payment Done data here */}
          <tr>
            <td colspan="6">TOTAL</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BTable;
