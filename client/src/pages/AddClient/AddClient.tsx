import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useHistory } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BackButton from "../../components/BackButton/BackButton";
import "./AddClient.styles.css";

import { State } from "../../redux/reducers";
import { useSelector } from "react-redux";
import { RegisterUser } from "../../redux/actionsCreator/auth.actionsCreator";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).max(15).required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const AddClient: React.FC = () => {
  const auth = useSelector((state: State) => state.auth);

  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: RegisterUser) => {
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

  const onSubmit = (data: RegisterUser) => {
    mutate(data);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <div className="add-fund">
        <BackButton text={"Dashboard"} />
        <div className="container-title">
          <p className="heading">Add Client</p>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <p className="add-title">Client Name:</p>
          <input
            type="text"
            className={errors.name ? "error-input" : "name"}
            {...register("name")}
          />
          <p className="error">{errors.name?.message}</p>
          <p className="add-title">Email:</p>
          <input
            type="text"
            className={errors.email?.message ? "error-input" : "email"}
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>
          <p className="add-title">Password:</p>
          <input
            type="password"
            className={errors.password ? "error-input" : "password"}
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
          <p className="add-title">Confirm Password:</p>
          <input
            type="password"
            className={errors.password2 ? "error-input" : "password"}
            {...register("password2")}
          />
          <p className="error">{errors.password2?.message}</p>
          <br />
          <button type="submit" className="add-client-btn">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
