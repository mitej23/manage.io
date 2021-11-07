import React from "react";
import "./BackButton.styles.css"
import { useHistory } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";


const BackButton = ({ text }) => {
  let history = useHistory();
  return (
    <>
      <div className="back" onClick={history.goBack}>
        <FiChevronLeft style={{ marginTop: "2px" }} />
        <p>{text}</p>
      </div>
    </>
  );
};

export default BackButton;
