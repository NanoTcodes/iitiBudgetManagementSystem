import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../contexts/alert/AlertContext";
import SelectedUserContext from "../../contexts/select/SelectedUserContext";
import "./updateProfile.css";

const UpdateProfile = () => {
  const { successful, unSuccessful } = useContext(AlertContext);
  const { SelectedUser } = useContext(SelectedUserContext);

  // Set initial form state with selected user's data
  const initialCreds = {
    name: SelectedUser.name || "", // Set default to empty string if name is not available
    username: SelectedUser.username|| "", // Set default to empty string if username is not available
    password: "",
    cPassword: "",
  };

  const [creds, setCreds] = useState(initialCreds);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (creds.password !== creds.cPassword) {
      return unSuccessful("Passwords didn't match");
    }

    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify(creds),
      }
    );

    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
    } else {
      successful(json.success);
      setCreds(initialCreds);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  // Update form fields when SelectedUser changes
  useEffect(() => {
    setCreds({
      ...creds,
      name: SelectedUser.name || "", // Update name if available
      username: SelectedUser.username|| "", // Update username if available
    });
  }, [SelectedUser]);

  return (
    <div className="add-user">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={creds.username}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="name">Updated Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={creds.name}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={creds.password}
          onChange={handleOnChange}
        />

        <label htmlFor="confirmpassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmpassword"
          name="cPassword"
          placeholder="Confirm password"
          value={creds.cPassword}
          onChange={handleOnChange}
        />

        <div className="container">
          <button className="btn btn-primary" type="submit">
            Submit{" "}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setCreds(initialCreds)}
          >
            Reset{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
