import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemsReducer from "./itemsReducer";
// import prices from "./pricesReducer";
import salesReducer from "./salesReducer";

export default combineReducers({
  authReducer,
  salesReducer,
  itemsReducer
  // prices,
});
