import { combineReducers } from "redux";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";

const initialState = {
  email: null,
  password: null,
  token: localStorage.getItem("token") || null,
  tokenExpiration: localStorage.getItem("tokenExpiration") || null,
  msg: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        password: null
      };
    case LOGOUT:
      return {
        initialState
      };
    case REGISTER:
      return {
        ...state,
        msg: action.payload.msg
      };
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer
});
