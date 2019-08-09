import { LOGIN, LOGOUT } from "../reducers/userReducer";

import { SET_START, SET_END } from "../reducers/salesReducer";

// USERS

export const login = token => {
  return {
    type: LOGIN,
    payload: {
      token
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// SALES => DATES

export const setStartDate = date => {
  console.log(date);
  return {
    type: SET_START,
    payload: date
  };
};

export const setEndDate = date => {
  return {
    type: SET_END,
    payload: date
  };
};
