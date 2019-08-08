import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL
} from "../reducers";

export const login = (token, tokenExpiration) => {
  return {
    type: LOGIN,
    payload: {
      token,
      tokenExpiration
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const register = () => {
  return {
    type: REGISTER,
    payload: {
      msg: "Successfully registered.  Please Login."
    }
  };
};

export const userEmail = email => {
  return {
    type: UPDATE_USER_EMAIL,
    payload: email
  };
};

export const userPassword = password => {
  return {
    type: UPDATE_USER_PASSWORD,
    payload: password
  };
};
