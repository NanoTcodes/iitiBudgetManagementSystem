import React from 'react'

const BudgetDetails = () => {
    return (
        <>
          <div className="p-4" style={{ backgroundColor: "white" }}>
            <h3 className="m-3 text-center">{name}</h3>
            <h4 className="m-3 text-center">
              {/* {type ? "Equipment" : "Consumable"} Budget {year}-{(year % 100) + 1} */}
            </h4>
            <div className="p-4">
              <table>
                <thead>
                  {" "}
                  <tr>
                    <th colSpan={12} className="text-center">
                      <h4
                        style={{
                          fontFamily: "Arial",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        Indents in Process
                      </h4>
                    </th>
                  </tr>
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
                    <td colSpan="2">{inProcess.budget}</td>
                    <td colSpan="3">{inProcess.expenditure}</td>
                    <td colSpan="3">{inProcess.process}</td>
                    <td colSpan="1">{inProcess.budget - inProcess.expenditure}</td>
                    <td colSpan="2">
                      {((inProcess.expenditure / inProcess.budget) * 100).toFixed(
                        2
                      )}
                      %
                    </td>
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
                  {}
                  <tr>
                    <th colSpan="13">
                      <h4
                        style={{
                          fontFamily: "Arial",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        Direct Purchases
                      </h4>
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
                  <td></td>
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
}

export default BudgetDetails
