import React from "react";

const Home = () => {
  return (
    <>
      <br />
      <br />
      <div class="container">
        <div class="centered-div">
          <h2>Equipment Budget for the year: 2023</h2>
        </div>
      </div>
      <br />
      <br />
      <table class="table-bordered">
        <thead>
          <tr>
            <th scope="col">Entry Date</th>
            <th scope="col">Particulars</th>
            <th scope="col">Year</th>
            <th scope="col">Indenter</th>
            <th scope="col">Amount</th>
            <th scope="col">Name of the party</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">14/11/2023</th>
            <td>Computers</td>
            <td>2023</td>
            <td>John Doe</td>
            <td>220000</td>
            <td>party 1</td>
          </tr>
          <tr>
            <th scope="row">14/11/2023</th>
            <td>Computers</td>
            <td>2023</td>
            <td>John Doe</td>
            <td>220000</td>
            <td>party 1</td>
          </tr>
          <tr>
            <th scope="row">14/11/2023</th>
            <td>Computers</td>
            <td>2023</td>
            <td>John Doe</td>
            <td>220000</td>
            <td>party 1</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <div class="container">
        <div class="centered-div2">
          <h2>Used Funds: Rs 126739.00</h2>
        </div>
        <div class="centered-div2">
          <h2>Available Funds: Rs 234156.00</h2>
        </div>
      </div>
    </>
  );
};

export default Home;