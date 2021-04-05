import React, { useEffect, useContext } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/landingpage/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Userdashboard } from "./components/dashboard/Userdashboard";
import Notfound from "./components/errorPage/NotFound";
import { Switch, Route } from "react-router-dom";
import { authContext } from "./context/authContext";
export default function App() {
  const { loadUser, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoutes exact path="/dashboard" component={Userdashboard} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
}
