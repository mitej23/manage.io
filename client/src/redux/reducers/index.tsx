import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
});
