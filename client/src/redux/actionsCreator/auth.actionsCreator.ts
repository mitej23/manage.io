import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//types
import { Dispatch } from "redux";
import { AuthActions } from "../actions/auth.actions";
import { ErrorActions } from "../actions/error.actions";
import { AuthActionTypes } from "../actionTypes/auth.actionTypes";
import { ErrorActionTypes } from "../actionTypes/error.actionTypes";
import { User } from "../reducers/auth.reducer";
import { RouteComponentProps } from "react-router-dom";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

interface token {
  success: boolean;
  token: string;
}

// Register User
export const registerUser =
  (userData: RegisterUser, history: RouteComponentProps["history"]) =>
  (dispatch: Dispatch<ErrorActions>) => {
    axios
      .post("/api/agents/register", userData)
      .then((res) => history.push("/login")) // re-direct to login on successful register
      .catch((err) =>
        dispatch({
          type: ErrorActionTypes.GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

// Login - get user token
export const loginUser =
  (userData: LoginUser) => (dispatch: Dispatch<AuthActions | ErrorActions>) => {
    axios
      .post<token>("/api/agents/login", userData)
      .then((res) => {
        // Save to localStorage
        // Set token to localStorage
        console.log("logged in from actions");
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded as User));
        return true;
      })
      .catch((err) => {
        dispatch({
          type: ErrorActionTypes.GET_ERRORS,
          payload: err.response.data,
        });
        return true;
      });
  };

// Set logged in user
export const setCurrentUser = (decoded: User) => {
  return {
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: AuthActionTypes.USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch: Dispatch<AuthActions>) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
