import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./AddClient.styles.css";
import { FiChevronLeft } from "react-icons/fi";



const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).max(15).required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const AddClient = ({ auth }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data) => {
      const response = await axios.post("/api/agents/client", {
        name: data.name,
        email: data.email,
        password: data.password,
        password2: data.password2,
        agentEmail: auth.user.email,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-clients");
        history.push("/user");
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  const backToDashboard = () => {
    history.push("/user");
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  console.log(errors);

  return (
    <div>
      <div className="add-fund">
        <div className="back" onClick={backToDashboard}>
          <FiChevronLeft style={{ marginTop: "2px" }} />
          <p className="back-text ">Dashboard</p>
        </div>
        <div className="container-title">
          <p>Add Client</p>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <p className="add-title">Fund Name:</p>
          <input
            type="text"
            className={errors.name ? "error-input" : "name"}
            name="name"
            {...register("name")}
          />
          <p className="error">{errors.name?.message}</p>
          <p className="add-title">Email:</p>
          <input
            type="text"
            className={errors.email?.message ? "error-input" : "email"}
            name="email"
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>
          <p className="add-title">Password:</p>
          <input
            type="password"
            className={errors.password ? "error-input" : "password"}
            name="password"
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
          <p className="add-title">Confirm Password:</p>
          <input
            type="password"
            className={errors.password2 ? "error-input" : "password"}
            name="password2"
            {...register("password2")}
          />
          <p className="error">{errors.password2?.message}</p>
          <br />
          <button type="submit" id="submit" className="btn">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

AddClient.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, null)(AddClient);
