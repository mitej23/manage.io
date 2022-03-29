import React from "react";
import "./Logo.styles.css";

const Logo = () => {
  return (
    <div className="landing-logo">
      <svg
        width="31"
        height="40"
        viewBox="0 0 31 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 0C0.447715 0 0 0.447714 0 0.999999V39C0 39.5523 0.447715 40 1 40H24.7143C25.2666 40 25.7143 39.5523 25.7143 39V38.7096H25.7144H27.3144C27.8666 38.7096 28.3144 38.2619 28.3144 37.7096V37.4194H28.3145H29.9145C30.4667 37.4194 30.9145 36.9717 30.9145 36.4194V6.16138C30.9145 5.60909 30.4667 5.16138 29.9145 5.16138H28.3145H28.3144V3.58057C28.3144 3.02828 27.8666 2.58057 27.3144 2.58057H25.7144H25.7143V1C25.7143 0.447715 25.2666 0 24.7143 0H1ZM27.3144 3.58057H25.7144V37.7096H27.3144V3.58057ZM29.9145 6.16138L28.3145 6.16138V36.4194H29.9145V6.16138Z"
          fill="url(#paint0_linear_380_30)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_380_30"
            x1="-6"
            y1="-57"
            x2="-50.638"
            y2="-37.4088"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#174994" />
            <stop offset="0.671744" stop-color="#9DC4FF" />
          </linearGradient>
        </defs>
      </svg>
      <p className="logo-text">Manage.io</p>
    </div>
  );
};

export default Logo;
