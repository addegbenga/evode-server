import React, { useState } from "react";
import google from "../../img/google.svg";
import { Link } from "react-router-dom";
import { api } from "../../utils/apiUrl";
import axios from "axios";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      console.log(response);
      const { data } = response;
      if (data.error) {
        setErrors(data.error);
      }
      console.log(data);
    } catch (error) {
      // login(email, password);
      // loginUser(form);
      // props.history.push("/");

      console.log(error);
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
    
      <div className="login-wrapper">
        <h1>Sign up</h1>
        <p>
          Dont have an account ? <Link to="/register"> Register</Link>
        </p>
        {errors && (
          <div className="error-style">
            {errors} <span onClick={() => setErrors("")}>X</span>
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
