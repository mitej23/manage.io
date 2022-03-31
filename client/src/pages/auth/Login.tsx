import React, { useEffect } from "react";
import "./Login.styles.css";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  LoginUser,
  loginUser,
} from "../../redux/actionsCreator/auth.actionsCreator";

//type
import { State } from "../../redux/reducers";

//form

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BackButton from "../../components/BackButton/BackButton";
import { ErrorActionTypes } from "../../redux/actionTypes/error.actionTypes";

const schema = yup.object().shape({
  email: yup.string().email("*Invalid email").required("*Email is required"),
  password: yup.string().min(6).max(15).required("*Password is required"),
});

const Login: React.FC = () => {
  const history = useHistory();

  //redux

  const dispatch = useDispatch();
  const auth = useSelector((state: State) => state.auth);
  const errors = useSelector((state: State) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginUser) => {
    const formState = dispatch(loginUser(data));
    console.log("formstate: ", formState);
    console.log("User Loged in ");
  };

  const cleanErrorState = () => {
    dispatch({
      type: ErrorActionTypes.CLEAR_ERRORS,
    });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user");
    }
  }, [auth.isAuthenticated, history]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <BackButton text="Back" />
        <p className="auth-title">Login</p>
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#0080ff", textDecoration: "underline" }}
            onClick={cleanErrorState}
          >
            Register
          </Link>
        </p>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <p className="add-title">Email</p>
          <input
            type="text"
            id="email"
            className="input"
            {...register("email")}
          />
          <p className="error">{formErrors?.email?.message}</p>
          <p className="error">{errors?.email}</p>
          <p className="add-title">Password</p>
          <input
            id="password"
            type="password"
            className="input"
            {...register("password")}
          />
          <p className="error">{formErrors?.password?.message}</p>
          <p className="error">{errors?.password}</p>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
