import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { authContext } from "../../context/authContext";

function Userdashboard() {
  const { user, dispatch } = useContext(authContext);

  return (
    <div className="dashboard-container">
      <h2>Welcome to your dashboard {user && user.name}</h2>
      <div className="dash-btns">
        <button
          onClick={() =>
            dispatch({
              type: "LOGOUT",
            })
          }
        >
          Logout
        </button>
        <button>
          <Link to="/changepassword">change password</Link>
        </button>
      </div>
      {/* <form>
        <input></input>
      </form> */}
    </div>
  );
}



export default withRouter(Userdashboard);
