import React, { useContext } from "react";
import { authContext } from "../../context/authContext";

export function Userdashboard() {
  const { user, dispatch } = useContext(authContext);

  return (
    <div>
      <h2>Welcome to your dashboard {user && user.name}</h2>
      dashboard page
      <button
        onClick={() =>
          dispatch({
            type: "LOGOUT",
          })
        }
      >
        Logout
      </button>
      <button>change password</button>
    </div>
  );
}
