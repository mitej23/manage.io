import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AddFund.styles.css";
import BackButton from "../../components/BackButton/BackButton";

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

import { State } from "../../redux/reducers";
import { useSelector } from "react-redux";
// import { OptionTypeBase } from "react-select/src/types";

type FundParam = {
  agentEmail: string;
  clientEmail: string;
  fundName: string;
  amt: number;
  code: number;
  date: string;
};

type FundReturn = {
  success?: boolean;
  error?: string;
};

type AddFundType = {
  amount: number;
  date: string;
  fund: FundSelect;
};

type FundSelect = {
  label: string;
  value: string;
};

type FundSelectResponse = {
  data: FundData;
};

type FundData = {
  data: Array<Fund>;
};

type Fund = {
  name: string;
  code: string;
};

type DatesResponse = {
  data: Dates;
};

type Dates = {
  dates: Array<string>;
};

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

const AddFund = () => {
  const auth = useSelector((state: State) => state.auth);

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
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // get client email from url params
  const clientEmail = pathname.split("/")[2] + ".com";

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data: AddFundType) => {
      return await axios.post<FundParam, FundReturn>(
        "/api/agents/client/fund",
        {
          agentEmail: auth.user.email,
          clientEmail,
          fundName: data.fund.label,
          amt: data.amount,
          code: parseInt(data.fund.value),
          date: data.date,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-clients");
        queryClient.invalidateQueries(["client-data", clientEmail]);
        history.goBack();
      },
    }
  );

  const onSubmit = (data: AddFundType) => {
    console.log(data);
    mutate(data);
    reset();
  };

  const _loadOptions = async (input: string, callback: any) => {
    await axios
      .get<string, FundSelectResponse>(`/api/allfunds?search=${input}`)
      .then((res) =>
        callback(
          res.data.data.map((fund) => ({
            label: fund.name,
            value: fund.code,
          }))
        )
      )
      .then(() => console.log("..fetching"));
  };

  const debouncedLoadOptions = _.debounce(_loadOptions, 300);

  const getFunds = (input: string, callback: any) => {
    if (_.isEmpty(input)) {
      return callback(null, { options: [] });
    }
    debouncedLoadOptions(input, callback);
  };

  useEffect(() => {
    // watch fund
    const fundChange = watch("fund");

    if (watch("fund")) {
      axios
        .get<number, DatesResponse>(`/api/fund/dates?code=${fundChange.value}`)
        .then((res) => {
          //parse the date and set state
          const dates = res.data.dates.map((date) =>
            parse(date, "dd-MM-yyyy", new Date())
          );
          setIncDates(dates);
          setEnableDate(true);
        });
    }
  }, [watch("fund")]);

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
          <input type="number" id="famount" {...register("amount")} />
          <p className="error">{errors.amount?.message}</p>
          <p className="add-title">Date of Investment:</p>
          <Controller
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

export default AddFund;
