import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(authContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated !== true ? (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutes;
