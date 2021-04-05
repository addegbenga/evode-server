export const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "REGISTERED_USER":
    case "LOGIN_USER":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: null,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        ...action.payload,
        successmsg: action.payload.msg,
      };
    case "LOGOUT":
      localStorage.removeItem("token", action.payload);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        successmsg: null,
      };
    case "ERROR_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        successmsg: null,
      };
    default:
      return state;
  }
};
