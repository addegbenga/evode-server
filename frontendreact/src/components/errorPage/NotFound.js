import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>oops oga the page you they look for no dey availabl</h1>
      <Link to="/">Go back </Link>
    </div>
  );
}
