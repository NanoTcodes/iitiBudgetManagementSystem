import React, { useContext, useEffect, useState } from "react";
import YearContext from "../../contexts/year/YearContext";
import AlertContext from "../../contexts/alert/AlertContext";
import { useNavigate } from "react-router-dom";
import "./home.css";

const DeptHome = () => {
  const { year } = useContext(YearContext);
  const { unSuccessful } = useContext(AlertContext);
  const [equipment, setEquipment] = useState();
  const [consumable, setConsumable] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/budget/fetchbudget?year=${year}`,
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
    } else {
      const { equipment, consumable } = json;
      console.log(equipment);
      setEquipment(equipment);
      setConsumable(consumable);
      setName(equipment.department);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <>
      <div className="p-4" style={{ backgroundColor: "white" }}>
        <h3 className="m-3 text-center">{name}</h3>
        <div className="p-4">
          <table>
            <thead>
              <th>Budget Type</th>
              <th>Budget Allocated</th>
              <th>Expenditure</th>
              <th>Available</th>
              <th>%Utilised</th>
            </thead>
            <tbody>
              <tr role="button" onClick={handleClick}>
                <td>Equipment Budget</td>
                <td>{equipment.budget}</td>
                <td>{equipment.expenditure}</td>
                <td>{equipment.in_process}</td>
                <td>
                  {((equipment.expenditure * 100) / equipment.budget).toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
              <tr role="button" onClick={handleClick}>
                <td>Consumable Budget</td> <td>{consumable.budget}</td>
                <td>{consumable.expenditure}</td>
                <td>{consumable.in_process}</td>
                <td>
                  {((consumable.expenditure * 100) / consumable.budget).toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeptHome;
