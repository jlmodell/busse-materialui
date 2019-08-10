// SALES REDUCER
export const SET_START = "SET_START";
export const SET_END = "SET_END";
export const REQUEST_DATA = "REQUEST_DATA"
export const DISTINCT_CUSTOMER_ARRAY = "DISTINCT_CUSTOMER_ARRAY"
export const CUSTOMER_DETAILS_ARRAY = "CUSTOMER_DETAILS_ARRAY"

const initialState = {
  start: localStorage.getItem("start") || null,
  end: localStorage.getItem("end") || null,
  // distinctCustomers: JSON.parse(localStorage.getItem("distinctCustomers")) || [],
  customerDetails: JSON.parse(localStorage.getItem("customerDetailsArray")) || [],
  loading: false
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
      case REQUEST_DATA:
        return {
          ...state,
          loading: true
        }
      case DISTINCT_CUSTOMER_ARRAY:
        return {
          ...state,
          distinctCustomers: action.payload,
          loading: false
        }
      case CUSTOMER_DETAILS_ARRAY:
        return {
          ...state,
          customerDetails: action.payload,
          loading: false
        }
    default:
      return state;
  }
};
