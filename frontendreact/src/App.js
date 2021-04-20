import React, { useEffect, useContext } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/landingpage/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Userdashboard from "./components/dashboard/Userdashboard";
import Notfound from "./components/errorPage/NotFound";
import { Switch, Route } from "react-router-dom";
import { authContext } from "./context/authContext";
import ChangePassword from "./components/auth/ChangePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import Resetpassword from "./components/auth/Resetpassword";
import Navbar from "./components/nav/Navbar";
import ProductDetails from "./components/product/ProductDetails";
import Adminboard from "./components/admin/Adminboard";
export default function App() {
  const { loadUser, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      {/* <Navbar /> */}
      <Switch>
        <PrivateRoutes path="/changepassword" component={ChangePassword} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:id" component={Resetpassword} />
        <PrivateRoutes exact path="/dashboard" component={Userdashboard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Adminboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
}
