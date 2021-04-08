import React, { useState } from "react";
import axios from "axios";
import { api } from "../../utils/apiUrl";

export default function ChangePassword(props) {
  const [formData, setFormData] = useState({
    newPassword: "",
    currentPassword: "",
  });
  const { newPassword, currentPassword } = formData;
  const [errorHandle, setHandle] = useState(false);
  const [successmsg, setSuccess] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // changePassword(currentPassword, newPassword);
    console.log(newPassword, currentPassword);

    try {
      const response = await axios.put(`${api}/auth/passwordChange`, {
        currentPassword,
        newPassword,
      });
      const { data } = response;
      if (data.error) {
        setHandle(data.error);
        console.log(data.error);
      } else {
        setSuccess("Password changed successfully");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>Change your password</h1>
          {errorHandle ? (
            <div className="error-style">
              {errorHandle} <span onClick={() => setHandle("")}>X</span>
            </div>
          ) : (
            successmsg && (
              <div className="error-style success-style">
                {successmsg} <span onClick={() => setSuccess("")}>X</span>
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
    </>
  );
}
