import axios from 'axios'

import { LOGIN, LOGOUT } from "../reducers/userReducer";
import { SET_START, SET_END, REQUEST_DATA, DISTINCT_CUSTOMER_ARRAY, CUSTOMER_DETAILS_ARRAY } from "../reducers/salesReducer";

// USERS

export const login = (user) => {
  return async function(dispatch, getState) {
    const res = await axios.post(`https://busse-nestjs-api.herokuapp.com/users/login`, {
      ...user
    })
    await localStorage.setItem("token", res.data.token)
    await dispatch(storeToken(res.data.token))
  }
}

export const storeToken = token => {
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

export const fetchData = () => {
  return function(dispatch, getState) {
    const { start, end } = getState().sales
    const { token } = getState().user

    const startDate = new Date(start).toISOString().substring(0, 10);
    const endDate = new Date(end).toISOString().substring(0, 10);

    dispatch(requestData())

    axios.get(`https://busse-nestjs-api.herokuapp.com/sales/distinct/cust/${startDate}/${endDate}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      const distinctCustomers = res.data[0].customer;
      const promises = distinctCustomers.map(customer => {
        return axios.get(`https://busse-nestjs-api.herokuapp.com/sales/summary/cust/${customer.name.split("|")[1]}/${startDate}/${endDate}`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => res.data)
      })
      Promise.all(promises).then(data => {
        let objectArray = []
        data.forEach(function(x){ objectArray.push(x[0])})
        localStorage.setItem("customerDetailsArray", JSON.stringify(objectArray))
        dispatch(customerDetailsArray(objectArray))    
      })
    })
  }
}

export const requestData = () => {
  return { type: REQUEST_DATA }
}

export const distinctCustomerArray = array => {
  return {
    type: DISTINCT_CUSTOMER_ARRAY,
    payload: array
  }
}

export const customerDetailsArray = array => {
  return {
    type: CUSTOMER_DETAILS_ARRAY,
    payload: array
  }
}

