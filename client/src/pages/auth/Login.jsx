import { useEffect } from "react";
import "./Login.styles.css";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actionsCreator/auth.actionsCreator";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BackButton from "../../components/BackButton/BackButton";

const schema = yup.object().shape({
  email: yup.string().email("*Invalid email").required("*Email is required"),
  password: yup.string().min(6).max(15).required("*Password is required"),
});

const Login = ({ auth, errors, loginUser }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors: formErrors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data);
    reset();
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user");
    }
  }, [auth.isAuthenticated, history]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);


  return (
    <div className="auth-container">
      <BackButton text="Back" />
      <p className="auth-title">Login</p>
      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{ color: "#0080ff", textDecoration: "underline" }}
        >
          Register
        </Link>
      </p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p className="add-title">Email</p>
        <input
          type="text"
          name="email"
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
          name="password"
          className="input"
          {...register("password")}
        />
        <p className="error">{formErrors?.password?.message}</p>
        <p className="error">{errors?.password}</p>

        <button type="submit" id="submit">
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});

export default connect(mapStateToProps, { loginUser })(Login);
