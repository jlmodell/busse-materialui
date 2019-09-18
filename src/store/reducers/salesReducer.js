// SALES REDUCER
export const SET_START = "SET_START";
export const SET_END = "SET_END";
export const REQUEST_DATA = "REQUEST_DATA";
export const ITEM = "ITEM";
export const DISTINCT_CUSTOMER_ARRAY = "DISTINCT_CUSTOMER_ARRAY";
export const DISTINCT_ITEM_ARRAY = "DISTINCT_ITEM_ARRAY";
export const CUSTOMER_DETAILS_ARRAY = "CUSTOMER_DETAILS_ARRAY";
export const ITEMS_DETAILS_ARRAY = "ITEMS_DETAILS_ARRAY";
export const INDIVIDUAL_SALES = "INDIVIDUAL_SALES";
export const INDIVIDUAL_ITEMS = "INDIVIDUAL_ITEMS";

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const maxDate = new Date(currentYear, lastMonth, 0);
const minDate = new Date(currentYear, lastMonth - 1, 1);

const initialState = {
  start: localStorage.getItem("start") || minDate,
  end: localStorage.getItem("end") || maxDate,
  distinctCustomersArray:
    JSON.parse(localStorage.getItem("distinctCustomersArray")) || [],
  distinctItemsArray:
    JSON.parse(localStorage.getItem("distinctItemsArray")) || [],
  customerDetails:
    JSON.parse(localStorage.getItem("customerDetailsArray")) || [],
  itemDetails: JSON.parse(localStorage.getItem("itemDetailsArray")) || [],
  individualSales:
    JSON.parse(localStorage.getItem("individualSalesByCustomer")) || [],
  individualItems:
    JSON.parse(localStorage.getItem("individualSalesByItem")) || [],
  item: localStorage.getItem("item") || "",
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
      };
    case ITEM:
      return {
        ...state,
        item: action.payload
      };
    case DISTINCT_CUSTOMER_ARRAY:
      return {
        ...state,
        distinctCustomersArray: action.payload,
        loading: false
      };
    case DISTINCT_ITEM_ARRAY:
      return {
        ...state,
        distinctItemsArray: action.payload,
        loading: false
      };
    case ITEMS_DETAILS_ARRAY:
      return {
        ...state,
        itemDetails: action.payload,
        loading: false
      };
    case CUSTOMER_DETAILS_ARRAY:
      return {
        ...state,
        customerDetails: action.payload,
        loading: false
      };
    case INDIVIDUAL_SALES:
      return {
        ...state,
        individualSales: action.payload,
        loading: false
      };

    case INDIVIDUAL_ITEMS:
      return {
        ...state,
        individualItems: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
