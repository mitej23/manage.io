import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AddFund.styles.css";
import BackButton from "../../components/BackButton/BackButton";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// form
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

//date
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse } from "date-fns";

const schema = yup.object().shape({
  fund: yup
    .object()
    .shape({
      label: yup.string().required("Fund is required"),
      value: yup.string().required("Fund is required"),
    })
    .required("Fund is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number"),
  date: yup.string().required("Date is required"),
});

const AddFund = ({ auth }) => {
  const [incDates, setIncDates] = useState([new Date()]);
  const [enableDate, setEnableDate] = useState(false);

  let history = useHistory();
  const { pathname } = history.location;
  // back button state
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // get client email from url params
  const clientEmail = pathname.split("/")[2] + ".com";

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data) => {
      const response = await axios.post("/api/agents/client/fund", {
        agentEmail: auth.user.email,
        clientEmail,
        fundName: data.fund.label,
        amt: data.amount,
        code: data.fund.value,
        date: data.date,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-clients");
        queryClient.invalidateQueries(["client-data", clientEmail]);
        history.goBack();
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
    reset();
  };

  const _loadOptions = async (input, callback) => {
    await axios(`/api/allfunds?search=${input}`)
      .then((res) =>
        callback(
          res.data.data.map((fund) => ({
            label: fund.name,
            value: fund.code,
          }))
        )
      )
      .then(console.log("..fetching"));
  };

  const debouncedLoadOptions = _.debounce(_loadOptions, 300);

  const getFunds = (input, callback) => {
    if (_.isEmpty(input)) {
      return callback(null, { options: [] });
    }
    debouncedLoadOptions(input, callback);
  };

  useEffect(() => {
    // watch fund
    const fundChange = watch("fund");

    if (fundChange) {
      axios(`/api/fund/dates?code=${fundChange.value}`).then((res) => {
        //parse the date and set state
        const dates = res.data.dates.map((date) =>
          parse(date, "dd-MM-yyyy", new Date())
        );
        setIncDates(dates);
        setEnableDate(true);
      });
    }
  }, [watch("fund")]);

  console.log(enableDate);

  return (
    <div>
      <div className="add-fund">
        <BackButton text={`${state}'s Dashboard`} />
        <div className="container-title">
          <p>Add Fund</p>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <p className="add-title">Fund Name:</p>
          <Controller
            name="fund"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                loadOptions={getFunds}
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={{
                  singleValue: (base, state) => ({
                    ...base,
                    color: state.selectProps.menuIsOpen
                      ? "#cdcdcd"
                      : base.color,
                  }),
                  container: (base) => ({
                    ...base,
                    width: "24rem",
                    fontFamily: "var(--font-family)",
                    fontStyle: "var(--font-style)",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    fontSize: "1.0125rem",
                    color: "white",
                    height: "2.3rem",
                    width: "10rem",
                    alignContainer: "center",
                    paddingTop: "0px",
                    paddingBottom: "1.5px",
                    marginLeft: "0.5%",
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    background: isSelected
                      ? "rgba(192, 192, 192, 0.22)"
                      : isFocused
                      ? "rgba(233, 233, 233, 0.22)"
                      : "",
                    color: isSelected ? "#000" : "#000",
                    width: "97%",
                    marginLeft: "0.5%",
                    borderRadius: "5px",
                    minHeight: "2.3rem",
                    display: "flex",
                    alignItems: "center",
                    margin: "4px 1%",
                  }),
                }}
              />
            )}
          />
          <p className="error">{errors.fund?.label.message}</p>
          <p className="add-title">Amount Invested:</p>
          <input
            type="number"
            id="famount"
            name="amount"
            {...register("amount")}
          />
          <p className="error">{errors.amount?.message}</p>
          <p className="add-title">Date of Investment:</p>
          <Controller
            id="date"
            name="date"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                includeDates={incDates}
                disabled={enableDate ? false : true}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                showYearDropdown
              />
            )}
          />

          <p className="error">{errors.date?.message}</p>
          <br />
          <button type="submit" id="submit" className="btn">
            Add Fund
          </button>
        </form>
      </div>
    </div>
  );
};

AddFund.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, null)(AddFund);
