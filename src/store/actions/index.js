import { LOGIN, UPDATE_USER_PASSWORD, UPDATE_USER_EMAIL } from "../reducers";

export const login = token => {
  return {
    type: LOGIN,
    payload: {
      token
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
