import { ErrorActionTypes } from "../actionTypes/error.actionTypes";
import { ErrorState } from "../reducers/error.reducer";

export interface GetErrorAction {
  type: ErrorActionTypes.GET_ERRORS;
  payload: ErrorState;
}
