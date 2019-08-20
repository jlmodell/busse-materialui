import axios from "axios";

import { LOGIN, TOKEN_DETAILS, LOGOUT } from "../reducers/userReducer";
import {
  SET_START,
  SET_END,
  REQUEST_DATA,
  DISTINCT_CUSTOMER_ARRAY,
  CUSTOMER_DETAILS_ARRAY,
  ITEMS_DETAILS_ARRAY,
  INDIVIDUAL_SALES,
  INDIVIDUAL_ITEMS
} from "../reducers/salesReducer";

// USERS

export const login = user => {
  return async function(dispatch, getState) {
    const res = await axios.post(
      `https://busse-nestjs-api.herokuapp.com/users/login`,
      {
        ...user
      }
    );
    await localStorage.setItem("token", res.data.token);
    await localStorage.setItem("expiresAt", res.data.expiresAt);
    await localStorage.setItem("createdAt", res.data.createdAt);
    await dispatch(storeTokenDetails(res.data.createdAt, res.data.expiresAt));
    await dispatch(storeToken(res.data.token));
  };
};

export const storeToken = token => {
  return {
    type: LOGIN,
    payload: {
      token
    }
  };
};

export const storeTokenDetails = (createdAt, expiresAt) => {
  return {
    type: TOKEN_DETAILS,
    payload: {
      createdAt,
      expiresAt
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

// SALES => DATA

export const fetchSalesData = () => {
  return function(dispatch, getState) {
    const { start, end } = getState().sales;
    const { token } = getState().user;

    const startDate = new Date(start).toISOString().substring(0, 10);
    const endDate = new Date(end).toISOString().substring(0, 10);

    dispatch(requestData());

    axios
      .get(
        `https://busse-nestjs-api.herokuapp.com/sales/distinct/cust/${startDate}/${endDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        const distinctCustomers = res.data;
        localStorage.setItem(
          "customerDetailsArray",
          JSON.stringify(distinctCustomers)
        );
        dispatch(customerDetailsArray(distinctCustomers));
      });
  };
};

export const fetchItemsData = () => {
  return function(dispatch, getState) {
    const { start, end } = getState().sales;
    const { token } = getState().user;

    const startDate = new Date(start).toISOString().substring(0, 10);
    const endDate = new Date(end).toISOString().substring(0, 10);

    dispatch(requestData());

    axios
      .get(
        `https://busse-nestjs-api.herokuapp.com/sales/distinct/item/${startDate}/${endDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        const distinctItems = res.data;
        localStorage.setItem("itemDetailsArray", JSON.stringify(distinctItems));
        dispatch(itemsDetailsArray(distinctItems));
      });
  };
};

export const fetchIndividualSalesByCustomer = cid => {
  return function(dispatch, getState) {
    const { start, end } = getState().sales;
    const { token } = getState().user;

    const startDate = new Date(start).toISOString().substring(0, 10);
    const endDate = new Date(end).toISOString().substring(0, 10);

    dispatch(requestData());

    axios
      .get(
        `https://busse-nestjs-api.herokuapp.com/sales/cust/${cid}/${startDate}/${endDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        const individualSales = res.data;
        localStorage.setItem(
          "individualSalesByCustomer",
          JSON.stringify(individualSales)
        );
        dispatch(individualItemsbyCustArray(individualSales));
      });
  };
};

export const fetchIndividualSalesByItem = iid => {
  return function(dispatch, getState) {
    const { start, end } = getState().sales;
    const { token } = getState().user;

    const startDate = new Date(start).toISOString().substring(0, 10);
    const endDate = new Date(end).toISOString().substring(0, 10);

    dispatch(requestData());

    axios
      .get(
        `https://busse-nestjs-api.herokuapp.com/sales/item/${iid}/${startDate}/${endDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        const individualItems = res.data;
        localStorage.setItem(
          "individualSalesByItem",
          JSON.stringify(individualItems)
        );
        dispatch(individualSalesByItemArray(individualItems));
      });
  };
};

export const requestData = () => {
  return { type: REQUEST_DATA };
};

export const distinctCustomerArray = array => {
  return {
    type: DISTINCT_CUSTOMER_ARRAY,
    payload: array
  };
};

export const customerDetailsArray = array => {
  return {
    type: CUSTOMER_DETAILS_ARRAY,
    payload: array
  };
};

export const itemsDetailsArray = array => {
  return {
    type: ITEMS_DETAILS_ARRAY,
    payload: array
  };
};

export const individualItemsbyCustArray = array => {
  return {
    type: INDIVIDUAL_SALES,
    payload: array
  };
};

export const individualSalesByItemArray = array => {
  return {
    type: INDIVIDUAL_ITEMS,
    payload: array
  };
};
