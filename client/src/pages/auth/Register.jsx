import { useEffect } from "react";
import "./Login.styles.css";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/auth.actions";
import PropTypes from "prop-types";
import BackButton from "../../components/BackButton/BackButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).max(15).required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = ({ auth, errors, registerUser }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors: formErrors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/user");
    }
  }, [auth, history]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    registerUser(data, history);
    reset();
  };

  return (
    <div className="auth-container">
      <BackButton text={"Back"} />
      <p className="auth-title">Register</p>
      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "#0080ff", textDecoration: "underline" }}
        >
          Login
        </Link>
      </p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p className="add-title">Name</p>
        <input
          id="name"
          type="text"
          name="name"
          className="input"
          {...register("name")}
        />
        <p className="error">{formErrors.name?.message}</p>
        <p className="add-title">Email</p>
        <input
          id="email"
          type="text"
          name="email"
          className="input"
          {...register("email")}
        />
        <p className="error">{formErrors.email?.message}</p>
        <p className="error">{errors?.email}</p>
        <p className="add-title">Password</p>
        <input
          id="password"
          type="password"
          autoComplete="true"
          name="password"
          className="input"
          {...register("password")}
        />
        <p className="error">{formErrors.password?.message}</p>
        <p className="add-title">Confirm Password</p>
        <input
          id="password2"
          type="password"
          autoComplete="true"
          name="password2"
          className="input"
          {...register("password2")}
        />
        {formErrors.password2?.message ? (
          <p className="error">{formErrors.password2?.message}</p>
        ) : null}

        <br />
        <button type="submit" id="submit">
          Register
        </button>
      </form>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});

export default connect(mapStateToProps, { registerUser })(Register);
