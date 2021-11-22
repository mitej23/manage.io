import { AuthActionTypes } from "../actionTypes/auth.actionTypes";
import { AuthActions } from "../actions/auth.actions";
import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | {};
  loading: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
};

export default function authReducer(
  state: AuthState = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case AuthActionTypes.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
