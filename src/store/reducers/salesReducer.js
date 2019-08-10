// SALES REDUCER
export const SET_START = "SET_START";
export const SET_END = "SET_END";
export const REQUEST_DATA = "REQUEST_DATA"
export const DISTINCT_CUSTOMER_ARRAY = "DISTINCT_CUSTOMER_ARRAY"
export const CUSTOMER_DETAILS_ARRAY = "CUSTOMER_DETAILS_ARRAY"
export const ITEMS_DETAILS_ARRAY = "ITEMS_DETAILS_ARRAY"
export const INDIVIDUAL_SALES = "INDIVIDUAL_SALES"

const initialState = {
  start: localStorage.getItem("start") || null,
  end: localStorage.getItem("end") || null,
  customerDetails: JSON.parse(localStorage.getItem("customerDetailsArray")) || [],
  itemDetails: JSON.parse(localStorage.getItem("itemDetailsArray")) || [],
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
      case ITEMS_DETAILS_ARRAY:
        return {
          ...state,
          itemDetailsArray: action.payload,
          loading: false
        }
      case CUSTOMER_DETAILS_ARRAY:
        return {
          ...state,
          customerDetails: action.payload,
          loading: false
        }
      case INDIVIDUAL_SALES:
        return {
          ...state,
          individualSales: action.payload,
          loading: false
        }
    default:
      return state;
  }
};
