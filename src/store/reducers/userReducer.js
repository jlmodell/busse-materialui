// USERS REDUCER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const initialState = {
  token: localStorage.getItem("token") || null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }
};