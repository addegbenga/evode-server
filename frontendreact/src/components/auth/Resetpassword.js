import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../context/authContext";

export default function Resetpassword(props) {
  const { error, resetPassword, dispatch } = useContext(authContext);
  const [formData, setFormData] = useState({
    password: "",
  });
  const { password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    resetPassword(password, props.match.params.id);
    setFormData({
      password: "",
    });
  };
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body">
        <h1 className="text-center mb-3">
          <i className="fas fa-sign-in-alt"></i> Reset Password
        </h1>
        {error && (
          <div className="error-style">
            {error}{" "}
            <span onClick={() => dispatch({ type: "CLEAR_ERROR" })}>X</span>
          </div>
        )}
        <ToastContainer />
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="password">Enter your new password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Enter your password"
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
