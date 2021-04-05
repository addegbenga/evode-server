import React, { useState, useContext } from "react";
import google from "../../img/google.svg";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../../context/authContext";

export default function Login(props) {
  const { isAuthenticated, login, error, dispatch } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(email, password);

    setFormData({
      email: "",
      password: "",
    });
  };
  let referer;
  if (props.location.state !== undefined) {
    referer = props.location.state.referer;
  } else {
    referer = "/";
  }

  if (isAuthenticated) {
    return <Redirect to={referer} />;
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Sign up</h1>
        <p>
          Dont have an account ? <Link to="/register"> Register</Link>
        </p>
        {error && (
          <div className="error-style">
            {error}{" "}
            <span onClick={() => dispatch({ type: "CLEAR_ERROR" })} >
              X
            </span>
          </div>
        )}
        <div className="login-inner">
          <div className="form-control">
            <label htmlFor="email" id="email">
              Email address*
            </label>
            <input
              name="email"
              placeholder="Samarie@gmail.com"
              type="email"
              id="email"
              onChange={handleOnChange}
              value={email}
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="password" id="password">
              Create password*
            </label>
            <input
              name="password"
              placeholder="********"
              type="password"
              onChange={handleOnChange}
              value={password}
              id="password"
            ></input>
          </div>
          <div className="terms-container">
            {/* <input type="checkbox" name="terms"></input> */}
            <span>Forgot password ?</span>
          </div>
          <div className="login-btn-container">
            <button className="login-btn" onClick={handleOnSubmit}>
              {" "}
              Login Account
            </button>
            <span className="login-btn-span">or</span>
            <button className="login-google">
              <img className="google-img" src={google} alt="google"></img>
              <span> Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
