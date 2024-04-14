import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";
// import SelectedUserContext from "../../contexts/select/SelectedUserContext";
// import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import "./allUsers.css";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
const AllUsers = () => {
  // console.log("AllUsers component mounted");

  const { unSuccessful, successful } = useContext(AlertContext);
  const [users, setUsers] = useState({ dept: [], admin: [], emp: [] });
  const [update, setUpdate] = useState(null);
  // const { SelectedUser, setSelectedUser } = useContext(SelectedUserContext);
  // console.log("SelectedUserContext value:", SelectedUser);
  // console.log("setSelectedUser function:", setSelectedUser);

  // const [departmentIndex, setDepartmentIndex] = useState(0);
  // const [faEmployeeIndex, setFaEmployeeIndex] = useState(0);
  // const [adminIndex, setAdminIndex] = useState(0);

  const roleArr = ["Admin", "F&A Employee", "Department"];

  const fetchData = async () => {
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
        const { users } = json;
        let admin = [],
          emp = [],
          dept = [];
        for (let i = 0; i < users.length; i++)
          if (users[i].role == 2) admin.push(users[i]);
          else if (users[i].role == 1) emp.push(users[i]);
          else dept.push(users[i]);
        setUsers({ admin, dept, emp });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      unSuccessful("Error fetching user data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const selectUser = async (s1, s2) => {
  //   setSelectedUser({ username: s1, name: s2 });
  //   console.log("user set", s1, s2);
  // };
  // const [forceUpdate, setForceUpdate] = useState(false); // Add dummy state

  const remUser = async (username) => {
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/removeUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ username }),
        }
      );
      const json = await response.json();
      if (json.error) unSuccessful(json.error);
      else {
        successful(json.success);
        const admin = users.admin.filter((user) => user.username !== username);
        const emp = users.emp.filter((user) => user.username !== username);
        const dept = users.dept.filter((user) => user.username !== username);
        setUsers({ dept, admin, emp });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      unSuccessful("Error fetching user data");
    }
  };

  const updateUser = async (user) => {
    console.log(user);
    setUpdate(user);
  };

  // Use forceUpdate as a dependency in useEffect

  // const renderDepartmentUsers = () => {
  //   let index = 0;
  //   return users.map((user) => {
  //     const { id, username, name, role } = user;
  //     if (role === 0) {
  //       index++;
  //       return (
  //         <tr key={id}>
  //           <td>{index}</td>
  //           <td>{name}</td>
  //           <td>{username}</td>
  //           <td>
  //             <a
  //               href="/finance/updateuser"
  //               onClick={() => selectUser(username, name)}
  //             >
  //               Update
  //             </a>
  //           </td>
  //           <td>
  //             <a onClick={() => remUser(username)}>Remove</a>
  //           </td>
  //         </tr>
  //       );
  //     }
  //     return null;
  //   });
  // };

  // const renderFaEmployeeUsers = () => {
  //   let index = 0;
  //   return users.map((user) => {
  //     const { id, username, name, role } = user;
  //     if (role === 1) {
  //       index++;
  //       return (
  //         <tr key={id}>
  //           <td>{index}</td>
  //           <td>{name}</td>
  //           <td>{username}</td>
  //           <td>
  //             <a
  //               href="/finance/updateuser"
  //               onClick={() => selectUser(username, name)}
  //             >
  //               Update
  //             </a>
  //           </td>
  //           <td>
  //             <a onClick={() => remUser(username)}>Remove</a>
  //           </td>
  //         </tr>
  //       );
  //     }
  //     return null;
  //   });
  // };

  // const renderAdminUsers = () => {
  //   let index = 0;
  //   return users.map((user) => {
  //     const { id, username, name, role } = user;
  //     if (role === 2) {
  //       index++;
  //       return (
  //         <tr key={id}>
  //           <td>{index}</td>
  //           <td>{name}</td>
  //           <td>{username}</td>
  //           <td>
  //             <a
  //               href="/finance/updateuser"
  //               onClick={() => selectUser(username, name)}
  //             >
  //               Update
  //             </a>
  //           </td>
  //           <td>
  //             <a onClick={() => remUser(username)}>Remove</a>
  //           </td>
  //         </tr>
  //       );
  //     }
  //     return null;
  //   });
  // };
  const UserDetails = ({ props }) => {
    const { user, i, role } = props;
    const { name, username } = user;
    return (
      <tr>
        <td>{i + 1}</td>
        <td>{username}</td>
        <td>{name}</td>
        <td>
          <button
            // href="/finance/updateuser"
            onClick={() => updateUser(user)}
          >
            Update
          </button>
        </td>
        <td>
          <button onClick={() => remUser(username, role)}>Remove</button>
        </td>
      </tr>
    );
  };

  return update ? (
    <UpdateProfile props={{ update, setUpdate,users, setUsers }} />
  ) : (
    <div className="user">
      <div className="centered-div2">
        <div className="heading">
          <h1 className="text-center">
            <b className="w3-large">User Details</b>
          </h1>
        </div>

        {roleArr.map((role, i) => {
          return (
            <div key={i}>
              <h3 className="text-center">
                <b className="w3-large">{role}</b>
              </h3>

              <div className="container table-container">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Username</th>
                      <th>Name</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {i == 0 ? (
                      users.admin.map((user, i) => {
                        return <UserDetails props={{ user, i }} key={i} />;
                      })
                    ) : i == 1 ? (
                      users.emp.length > 0 ? (
                        users.emp.map((user, i) => {
                          return <UserDetails props={{ user, i }} key={i} />;
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            <h6>No Employees</h6>
                          </td>
                        </tr>
                      )
                    ) : users.dept.length ? (
                      users.dept.map((user, i) => {
                        return <UserDetails props={{ user, i }} key={i} />;
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <h6>No Departments</h6>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        {/* <h3 className="text-center">
          <b className="w3-large">F&A Employees</b>
        </h3>
        <div className="container table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div> 
        <h3 className="text-center">
          <b className="w3-large">Admin</b>
        </h3>
        <div className="container table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>*/}
      </div>
    </div>
  );
};

export default AllUsers;
