import "./Dashboard.styles.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import axios from "axios";

const Dashboard = ({ auth }) => {
  const { data, isLoading } = useQuery(["all-clients"], () => {
    return axios.get("/api/agents/clients", {
      params: { agentEmail: auth.user.email },
    });
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <p className="welcome">Welcome {auth.user.name.split(" ")[0]},</p>
      </div>
      <div className="container-title">
        <p>Overview</p>
      </div>
      <div className="agent-overview-container">
        <div className="agent-overview-stats">
          <div className="agent-stats-item-container">
            <p className="item-head">Total Clients</p>
            <p className="item-body">{data.data.length}</p>
          </div>
          <div className="agent-stats-item-container">
            <p className="item-head">Total Investments</p>
            <p className="item-body">
              {data.data.reduce((acc, client) => {
                return acc + client.funds.length;
              }, 0)}
            </p>
          </div>
          <div className="agent-stats-item-container">
            <p className="item-head">Portfoio Value</p>
            <p className="item-body">
              $
              {data.data.reduce((acc, client) => {
                return acc + client.totalInvested;
              }, 0)}
            </p>
          </div>
        </div>
        <div className="agent-overview-graph">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div className="portfolio-head">
        <div className="container-title portfolio-title">
          <p>Portfolio</p>
        </div>
        <Link to="/user/add-client" className="add-fund-btn">
          <p>+ Add Client</p>
        </Link>
      </div>
      <div className="agent-portfolio-container">
        <div className="agent-portfolio-container-head">
          <p className="agent-portfolio-name">Client Name</p>
          <p className="agent-portfolio-right">No. Investments</p>
          {/* <p className="agent-portfolio-right">Net Profit/Loss</p> */}
          <p className="agent-portfolio-right">Total Invs.</p>
        </div>

        <div className="agent-portfolio-container-content">
          {data &&
            data.data.map((client) => {
              //remove .com from email
              const clientEmail = client.clientEmail.split(".com")[0];
              return (
                <Link
                  to={{
                    pathname: `/user/${clientEmail}`,
                    state: { client: client },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div key={client.clientEmail} className="agent-portfolio">
                    <p className="agent-portfolio-name">{client.clientName}</p>
                    <p className="agent-portfolio-right">
                      {client.funds.length}
                    </p>
                    {/* <p className="agent-portfolio-right">$0</p> */}
                    <p className="agent-portfolio-right">
                      ${client.totalInvested}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, null)(Dashboard);
