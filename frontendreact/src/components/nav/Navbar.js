import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import lenx from "../../img/lenx.png";
import avatar from "../../img/profile.png";
import { authContext } from "../../context/authContext";

export default function Navbar() {
  const { isAuthenticated } = useContext(authContext);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const popup = !isAuthenticated ? (
    <ul>
      <li>Home</li>
      <li>
        <Link to="register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );

  return (
    <div className="nav-container">
      <div className="nav-inner">
        <img src={lenx} alt="lenx"></img>
        <div className="flex-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Service</Link>
            </li>
          </ul>
          <div className="avatar-container">
            <img src={avatar} alt="avatar" onClick={handleClick}></img>
            <div className="nav-pop">{show && popup}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
