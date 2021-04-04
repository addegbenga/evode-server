import React from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/landingpage/Home";
import Userdashboard from "../components/dashboard/Userdashboard";
import Notfound from "../components/errorPage/NotFound";
import { Switch, Route } from "react-router-dom";
export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Userdashboard} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
}
