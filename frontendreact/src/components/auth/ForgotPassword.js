import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

export default function ForgotPassword() {
  const { successmsg, error, forgotPassword, dispatch } = useContext(
    authContext
  );
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    forgotPassword(email);

    setFormData({
      email: "",
    });
  };
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body">
        <h1 className="text-center mb-3">
          <i className="fas fa-sign-in-alt"></i> Reset Password
        </h1>
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
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
        <p className="lead mt-4">
          <Link to="/">Back</Link>
        </p>
      </div>
    </div>
  );
}
