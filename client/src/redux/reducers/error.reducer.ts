import { GetErrorAction } from "../actions/error.actions";
import {ErrorActionTypes} from "../actionTypes/error.actionTypes"
const initialState = {};

export interface ErrorState {
  email?: string;
  password?: string;
}

export default function errorReducer(
  state: ErrorState = initialState,
  action: GetErrorAction
) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
