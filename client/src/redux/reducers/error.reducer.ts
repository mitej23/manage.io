import { ErrorActions } from "../actions/error.actions";
import { ErrorActionTypes } from "../actionTypes/error.actionTypes";
const initialState = {};

export interface ErrorState {
  email?: string;
  password?: string;
}

export default function errorReducer(
  state: ErrorState = initialState,
  action: ErrorActions
) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS:
      return action.payload;
    case ErrorActionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
