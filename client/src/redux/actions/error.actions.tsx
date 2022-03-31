import { ErrorActionTypes } from "../actionTypes/error.actionTypes";
import { ErrorState } from "../reducers/error.reducer";

export interface ErrorActions {
  type: ErrorActionTypes;
  payload?: ErrorState;
}
