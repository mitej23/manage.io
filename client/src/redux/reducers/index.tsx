import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";

const reducers =  combineReducers({
  auth: authReducer,
  error: errorReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;