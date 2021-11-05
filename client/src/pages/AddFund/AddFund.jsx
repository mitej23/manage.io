import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AddFund.styles.css";
import { FiChevronLeft } from "react-icons/fi";

// form
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import axios from "axios";

const options = [
  { label: "HDFC", value: "30000" },
  { label: "ICICI", value: "40000" },
  { label: "SBI", value: "50000" },
  { label: "AXIS", value: "60000" },
];

const AddFund = () => {
  let history = useHistory();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <div>
      <div className="add-fund">
        <div className="back" onClick={history.goBack}>
          <FiChevronLeft style={{ marginTop: "2px" }} />
          <p className="back-text ">{state}'s Dashboard</p>
        </div>
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
                options={options}
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
                    height: "2.3rem",
                    display: "flex",
                    alignItems: "center",
                    margin: "4px 1%",
                  }),
                }}
              />
            )}
          />
          <p className="add-title">Amount Invested:</p>
          <input
            type="number"
            id="famount"
            name="amount"
            {...register("amount")}
          />
          <p className="add-title">Date of Investment:</p>
          <input type="date" id="fdate" name="date" {...register("date")} />
          <br />
          <button type="submit" id="submit" className="btn">
            Add Fund
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFund;
