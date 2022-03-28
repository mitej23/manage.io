import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import { BsArrowRight } from "react-icons/bs";

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <NavBar />
      <div className="landing-container">
        <p className="top-text">EASY TO USE. TRACK PORTFOLIO</p>
        <p className="main-text">
          Best way to manage your client's{" "}
          <span className="text-highlight">Mutual Fund</span> Investments
        </p>

        <div className="landing-buttons">
          <Link to="/register" className="landing-button slide_down">
            Get Started <BsArrowRight className="right-arrow-icon"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
