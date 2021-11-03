import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AddFund.styles.css";
import { FiChevronLeft } from "react-icons/fi";

const AddFund = () => {
  let history = useHistory();
  const { state } = useLocation();

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
        <p className="add-title">Fund Name:</p>
        <input type="text" id="fname" name="fname" />
        <p className="add-title">Amount Invested:</p>
        <input type="number" id="famount" name="famount" />
        <p className="add-title">Date of Investment:</p>
        <input type="date" id="fdate" name="fdate" />
        <br />
        <button type="button" id="submit" className="btn">
          Add Fund
        </button>
      </div>
    </div>
  );
};

export default AddFund;
