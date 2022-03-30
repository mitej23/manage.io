import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Search.styles.css";

//form
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import axios from "axios";
import { useQuery } from "react-query";
import SearchedFundContainer from "../../components/SearchedFundContainer/SearchedFundContainer";

const schema = yup.object().shape({
  fund: yup
    .object()
    .shape({
      label: yup.string().required("Fund is required"),
      value: yup.string().required("Fund is required"),
    })
    .required("Fund is required"),
});

const Search = () => {
  const [fundCode, setFundCode] = useState("");
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setFundCode(data.fund.value);
    reset();
  };

  const { data, isLoading } = useQuery(
    ["search", fundCode],
    () => {
      return axios.get(`/api/fund?code=${fundCode}`);
    },
    {
      enabled: Boolean(fundCode),
    }
  );

  const _loadOptions = async (input, callback) => {
    await axios
      .get(`/api/allfunds?search=${input}`)
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

  const getFunds = (input, callback) => {
    if (_.isEmpty(input)) {
      return callback(null, { options: [] });
    }
    debouncedLoadOptions(input, callback);
  };
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="search-form"
      >
        <Controller
          name="fund"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              placeholder="Search for a fund"
              loadOptions={getFunds}
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "var(--bg-main)",
                  boxShadow: "var(--shadow-small)",
                  "&:hover": {
                    borderColor: "var(--bg-main)",
                    cursor: "text",
                  },
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  display: "none",
                }),
                menu: (base) => ({
                  ...base,
                  border: "var(--border)",
                  boxShadow: "var(--shadow)",
                }),
                menuList: (base) => ({
                  ...base,
                  "::-webkit-scrollbar": {
                    width: "9px",
                    borderRadius: "4px",
                  },
                  "::-webkit-scrollbar-track": {
                    width: "0px",
                    background: "transparent",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                    borderRadius: "4px",
                  },
                }),
                singleValue: (base, state) => ({
                  ...base,
                  color: state.selectProps.menuIsOpen ? "black" : base.color,
                }),
                container: (base) => ({
                  ...base,
                  width: "32rem",
                  fontFamily: "var(--font-family)",
                  fontStyle: "var(--font-style)",
                  marginTop: "0.5rem",
                  marginRight: "1rem",
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
                    ? "#7166f9"
                    : isFocused
                    ? "#e9e8fb"
                    : "",
                  color: isSelected ? "white" : "#000",
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
        <button type="submit" className="add-fund-btn">
          Search
        </button>
      </form>
      <SearchedFundContainer data={data?.data} isLoading={isLoading}/>
    </div>
  );
};

export default Search;
