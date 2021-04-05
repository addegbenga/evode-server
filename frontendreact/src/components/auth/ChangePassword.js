import React, { useState, useContext } from "react";
import { authContext } from "../../context/authContext";

export default function ChangePassword(props) {
  const { changePassword, error, successmsg, dispatch } = useContext(
    authContext
  );
  const [formData, setFormData] = useState({
    newPassword: "",
    currentPassword: "",
  });
  const { newPassword, currentPassword } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);

    setFormData({
      currentPassword: "",
      newPassword: "",
    });
  };

  return (
    <div>
      <div>
        <h1>Change your password</h1>
        {error ? (
          <div className="error-style">
            {error}{" "}
            <span onClick={() => dispatch({ type: "CLEAR_ERROR" })}>X</span>
          </div>
        ) : (
          successmsg && (
            <div className="error-style success-style">
              {successmsg}{" "}
              <span onClick={() => dispatch({ type: "CLEAR_ERROR" })}>X</span>
            </div>
          )
        )}
        <div>
          <div>
            <label htmlFor="currentPassword" id="currentPassword">
              Enter current password*
            </label>
            <input
              name="currentPassword"
              placeholder="Enter your current password"
              type="password"
              id="currentPassword"
              onChange={handleOnChange}
              value={currentPassword}
            ></input>
          </div>
          <div>
            <label htmlFor="newPassword" id="newPassword">
              Enter new password*
            </label>
            <input
              name="newPassword"
              placeholder="Enter new password"
              type="password"
              onChange={handleOnChange}
              value={newPassword}
              id="newPassword"
            ></input>
          </div>
          <button onClick={handleOnSubmit}> Change</button>
        </div>
      </div>
    </div>
  );
}
