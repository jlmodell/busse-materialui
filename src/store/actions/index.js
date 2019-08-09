import { LOGIN, LOGOUT } from "../reducers/userReducer";

import {
  SET_START,
  SET_END,
  FETCH_DISTINCT_CUSTOMERS,
  STORE_CUSTOMERS_INFO,
  IS_LOADING
} from "../reducers/salesReducer";

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

export const fetchDistinctCustomers = customersArr => {
  return {
    type: FETCH_DISTINCT_CUSTOMERS,
    payload: [customersArr]
  };
};

export const storeCustomersInfo = customersInfoArr => {
  return {
    type: STORE_CUSTOMERS_INFO,
    payload: [customersInfoArr]
  };
};

export const isLoading = bool => {
  return {
    type: IS_LOADING,
    payload: bool
  };
};
