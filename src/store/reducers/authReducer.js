export const LOGIN = "auth/login";
export const SET_USER_DATA = "auth/setUserData";
export const IS_LOGGED = "auth/isLogged";
export const LOGOUT = "auth/logout";

const initialState = {
  user: {
    email: "",
    password: "",
    token: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: {
          [action.field]: action.value
        }
      };
    case LOGIN:
      return {
        ...state,
        user: {
          password: null,
          token: action.payload.token
        }
      };
    case IS_LOGGED:
      return { ...state.user };
    case LOGOUT:
      return initialState;
    default:
      return { ...state };
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
