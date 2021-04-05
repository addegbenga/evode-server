import React, { useState } from "react";
import { Link } from "react-router-dom";
import google from "../../img/google.svg";
import { api } from "../../utils/apiUrl";
import axios from "axios";

export default function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState(false);
  const [resp, setResp] = useState(false);

  const { email, password, name } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/register`, {
        name,
        email,
        password,
      });
      console.log(response);
      const { data } = response;
      if (data.error) {
        setErrors(data.error);
        setResp("");
      } else {
        setErrors("");
        setResp(data.msg);
        setTimeout(() => props.history.push("/login"), 2000);
      }
      console.log(data);
    } catch (error) {
      // login(email, password);
      // loginUser(form);
      // props.history.push("/");

      console.log(error);
    }
    setFormData({
      name,
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Sign up</h1>
        <p>
          Already got an account ? <Link to="/login"> Login</Link>
        </p>
        {errors ? (
          <div className="error-style">
            {errors} <span onClick={() => setErrors("")}>X</span>
          </div>
        ) : (
          resp && (
            <div className="error-style">
              {resp} <span onClick={() => setErrors("")}>X</span>
            </div>
          )
        )}
        <div className="login-inner">
          <div className="form-control">
            <label htmlFor="name" id="name">
              Your Fullname*
            </label>
            <input
              value={name}
              onChange={handleOnChange}
              name="name"
              placeholder="Samarie brant"
              type="name"
              id="name"
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="email" id="email">
              Email address*
            </label>
            <input
              value={email}
              onChange={handleOnChange}
              name="email"
              placeholder="Samarie@gmail.com"
              type="email"
              id="email"
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="password" id="password">
              Create password*
            </label>
            <input
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="********"
              type="password"
              id="password"
            ></input>
          </div>
          <div className="terms-container">
            <input type="checkbox" name="terms"></input>
            <span>I agree to terms and conditions</span>
          </div>
          <div className="login-btn-container">
            <button onClick={handleOnSubmit} className="login-btn">
              {" "}
              Register Account
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
