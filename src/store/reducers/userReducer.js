// USERS REDUCER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOKEN_DETAILS = "TOKEN_DETAILS";

const initialState = {
  token: localStorage.getItem("token") || null,
  tokenDetails: {
    createdAt: localStorage.getItem("createdAt") || null,
    expiresAt: localStorage.getItem("expiresAt") || null
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token
      };
    case TOKEN_DETAILS:
      return {
        ...state,
        tokenDetails: {
          createdAt: action.payload.createdAt,
          expiresAt: action.payload.expiresAt
        }
      };
    case LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }
};
