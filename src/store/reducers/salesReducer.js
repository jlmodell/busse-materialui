export const CUSTOMERS_ARRAY = "fetch/customersArray";
export const SINGLE_CUSTOMER = "fetch/singleCustomer";
export const CUSTOMER_ARRAY = "fetch/customerArray";

const initialState = {
  api: {
    url: "https://busse-nestjs-api.herokuapp.com"
  },
  customers: ["1", "2", "3"],
  customer: ["A", "B", "C"]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CUSTOMERS":
      return state.customers;
    case "CUSTOMER":
      return state.customer.filter(c => c._id.cid === action.payload);
    case "CUSTOMAR_ARRAY":
      return state.customer;
    default:
      return { ...state };
  }
};

export const customersArray = () => dispatch => {
  dispatch({ type: CUSTOMERS_ARRAY });
};
export const singleCustomer = () => dispatch => {
  dispatch({ type: SINGLE_CUSTOMER });
};
export const customerArray = () => dispatch => {
  dispatch({ type: CUSTOMERS_ARRAY });
};
