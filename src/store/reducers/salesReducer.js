// SALES REDUCER
export const SET_START = "SET_START";
export const SET_END = "SET_END";
export const FETCH_DISTINCT_CUSTOMERS = "FETCH_DISTINCT_CUSTOMERS";
export const STORE_CUSTOMERS_INFO = "STORE_CUSTOMER INFO";
export const IS_LOADING = "IS_LOADING";

const initialState = {
  start: localStorage.getItem("start") || null,
  end: localStorage.getItem("end") || null,
  distinctCustomers:
    JSON.parse(localStorage.getItem("distinctCustomers")) || [],
  customers: JSON.parse(localStorage.getItem("customersData")) || [],
  loading: true
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START:
      return {
        ...state,
        start: action.payload
      };
    case SET_END:
      return {
        ...state,
        end: action.payload
      };
    case FETCH_DISTINCT_CUSTOMERS:
      return {
        ...state,
        distinctCustomers: [action.payload]
      };
    case STORE_CUSTOMERS_INFO:
      return {
        ...state,
        customers: [action.payload]
      };
    case IS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
