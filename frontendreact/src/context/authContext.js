import React, { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { api } from "../utils/apiUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
  successmsg: null,
  user: null,
  isAuthenticated: null,
};

export const authContext = createContext(initialState);

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  //loading user
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const response = await axios.get(`${api}/auth/me`);

      dispatch({
        type: "USER_LOADED",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      const { data } = response;
      if (data.error) {
        dispatch({
          type: "ERROR_USER",
          payload: data.error,
        });
      } else {
        dispatch({
          type: "LOGIN_USER",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //login user
  const changePassword = async (currentPassword, newPassword) => {
    dispatch({
      type: "SET_LOADER",
    });
    try {
      const response = await axios.put(`${api}/auth/passwordChange`, {
        currentPassword,
        newPassword,
      });
      const { data } = response;
      if (data.error) {
        dispatch({
          type: "ERROR_USER",
          payload: data.error,
        });
      } else {
        dispatch({
          type: "LOGIN_USER",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //reset password
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${api}/auth/forgotpassword`, {
        email,
      });

      const { data } = response;
      console.log(data);
      if (data.error) {
        dispatch({
          type: "ERROR_USER",
          payload: data.error,
        });
      } else {
        dispatch({
          type: "SUCCESS_MSG",
          payload: data,
        });
        toast("wow we just sent you an email ");

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //reset password from email link
  const resetPassword = async (password,id) => {
    try {
      const response = await axios.put(`${api}/auth/resetpassword/${id}`, {
        password,
      });

      const { data } = response;
      console.log(data);
      if (data.error) {
        dispatch({
          type: "ERROR_USER",
          payload: data.error,
        });
      } else {
        dispatch({
          type: "SUCCESS_MSG",
          payload: data,
        });
        toast("password changed succesfully you can login with your new details ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        successmsg: state.successmsg,
        dispatch,
        forgotPassword,
        loadUser,
        login,
        changePassword,
        resetPassword
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
