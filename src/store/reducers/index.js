import { combineReducers } from "redux";
import { userReducer } from './userReducer'
import { salesReducer } from './salesReducer'

export default combineReducers({
  user: userReducer,
  sales: salesReducer
});
