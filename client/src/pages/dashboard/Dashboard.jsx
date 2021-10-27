import React from "react";
import "./Dashboard.styles.css";
import { useHistory } from "react-router";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Dasboard</h1>
      button to go to add client
      <button
        onClick={() => {
          history.push("/user/add-client");
        }}
      >
        Add Client
      </button>
      <button
        onClick={() => {
          history.push("/user/mitej");
        }}
      >
        Check client
      </button>
    </div>
  );
};

export default Dashboard;
