import ACTIONS from "./index";
import axios from "axios";

export const fetchAllUsers = async (token) => {
  const res = await axios.get("/api/auth/me");
  return res;
};

export const dispatchGetAllUsers = (res) => {
  return {
    type: ACTIONS.GET_ALL_USERS,
    payload: res.data,
  };
};
