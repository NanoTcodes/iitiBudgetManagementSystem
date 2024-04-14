import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";
import { useNavigate } from "react-router-dom";
import "./allUsers.css";
const AllUsers = () => {
  const { unSuccessful } = useContext(AlertContext);
  const [users, setUsers] = useState([]);
  const [departmentIndex, setDepartmentIndex] = useState(0);
  const [faEmployeeIndex, setFaEmployeeIndex] = useState(0);
  const [adminIndex, setAdminIndex] = useState(0);

  const roleArr = ["Department", "F&A Employee", "Admin"];

  const allUsers = async () => {
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/user/allUsers`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.error) unSuccessful(json.error);
      else {
        setUsers(json.users);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      unSuccessful("Error fetching user data");
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  const renderDepartmentUsers = () => {
    let index = 0;
    return users.map((user) => {
      const { id, username, name, role } = user;
      if (role === 0) {
        index++;
        return (
          <tr key={id}>
            <td>{index}</td>
            <td>{name}</td>
            <td>{username}</td>
          </tr>
        );
      }
      return null;
    });
  };

  const renderFaEmployeeUsers = () => {
    let index = 0;
    return users.map((user) => {
      const { id, username, name, role } = user;
      if (role === 1) {
        index++;
        return (
          <tr key={id}>
            <td>{index}</td>
            <td>{name}</td>
            <td>{username}</td>
          </tr>
        );
      }
      return null;
    });
  };

  const renderAdminUsers = () => {
    let index = 0;
    return users.map((user) => {
      const { id, username, name, role } = user;
      if (role === 2) {
        index++;
        return (
          <tr key={id}>
            <td>{index}</td>
            <td>{name}</td>
            <td>{username}</td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div className="user">
      <div className="centered-div2">
      <div className="heading">
        <h1 className="text-center" >
          <b className="w3-large">User Details</b>
        </h1>
      </div>
        <h3 className="text-center" >
          <b className="w3-large">Departments</b>
        </h3>
      
          {/* <div className="container centered-div2">
                <h3 className="text-center" color="white">Departments</h3>
                </div> */}
      <div className="container table-container">
              
            
        <table className="table table-bordered">
          <thead>
            <tr >
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{renderDepartmentUsers()}</tbody>
        </table>
      </div>
      <h3 className="text-center" >
          <b className="w3-large">F&A Employees</b>
        </h3>
      <div className="container table-container">
        <table className="table table-bordered">
          <thead>
         
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{renderFaEmployeeUsers()}</tbody>
        </table>
      </div>
      <h3 className="text-center" >
          <b className="w3-large">Admin</b>
        </h3>
      <div className="container table-container">
        <table className="table table-bordered">
          <thead>
          
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{renderAdminUsers()}</tbody>
        </table>
      </div></div>
    </div>
  );
};

export default AllUsers;
