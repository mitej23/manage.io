import React from "react";
import "./ClientDashbaord.styles.css";
import { useHistory } from "react-router-dom";

const ClientDashboard = () => {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      <h1>Clients Dashboard</h1>
      button to go to add client
      <button
        onClick={() => {
          history.push(`${pathname}/add-fund`);
        }}
      >
        Add Fund
      </button>
      <button
        onClick={() => {
          history.push(`${pathname}/hdfc-fund`);
        }}
      >
        Check fund
      </button>
    </div>
  );
};

export default ClientDashboard;
