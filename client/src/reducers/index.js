import { combineReducers } from "redux";
import messages from "./messages";
import auth from "./auth";
import portfolio from "./portfolio";

export default combineReducers({
  messages,
  auth,
  portfolio
});
