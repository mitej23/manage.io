import { User } from "../reducers/auth.reducer";
import { AuthActionTypes } from "../actionTypes/auth.actionTypes";

interface SetCurrentUserAction {
  type: AuthActionTypes.SET_CURRENT_USER;
  payload: User;
}

interface UserLoadingAction {
  type: AuthActionTypes.USER_LOADING;
}

export type AuthActions = SetCurrentUserAction | UserLoadingAction;
