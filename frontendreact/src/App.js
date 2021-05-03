import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

import axios from "axios";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/Forgotpassword";
import ResetPassword from "./components/auth/Resetpassword";
import ActivationEmail from "./components/auth/ActivationEmail";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser().then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
      <Route exact path="/resetpassword/:reset_token" component={ResetPassword}></Route>
      <Route exact path="/activate/:activation_token" component={ActivationEmail}></Route>
    </Switch>
  );
}
export default App;
