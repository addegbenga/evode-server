import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateRoutes = ({ isAuth, component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(authContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading === true) {
          return <Spinner />;
        } else if (isAuthenticated === true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              // to="/login"
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoutes;
