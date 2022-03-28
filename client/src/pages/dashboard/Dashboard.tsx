import "./Dashboard.styles.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";

import { State } from "../../redux/reducers";

import TimelineChart from "../../components/TimelineChart/TimelineChart";

type Data = {
  data: Array<Client>;
};

type Client = {
  clientName: string;
  clientPassword: string;
  clientEmail: string;
  totalInvested: number;
  _id: string;
  funds: Array<Fund>;
};

type Fund = {
  fundName: string;
  amtInvested: number;
  code: number;
  dateOfInvestment: string;
  _id: string;
};

type Investement = {
  clientName: string;
  fundName: string;
  amtInvested: number;
  dateOfInvestment: string;
};

type TimeLineData = {
  data: TData;
};

type TData = {
  monthsArray: Array<MonthsArray>;
};

type MonthsArray = {
  date: string;
  totalInvested: number;
  investments: Array<Investement>;
};

const Dashboard: React.FC = () => {
  const auth = useSelector((state: State) => state.auth);

  const { data, isLoading } = useQuery(["all-clients"], () => {
    return axios.get<string, Data>("/api/agents/clients", {
      params: { agentEmail: auth.user.email },
    });
  });

  const { data: timeLineData, isLoading: isTimelineLoading } = useQuery(
    "timline",
    () => {
      return axios.get<string, TimeLineData>("/api/agents/timeline", {
        params: { agentEmail: auth.user.email },
      });
    }
  );

  if (isLoading || isTimelineLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <p className="welcome">Welcome {auth.user.name!.split(" ")[0]},</p>
      </div>
      <div className="overview-header-container">
        <p className="heading">Portfolio Overview</p>
        <div className="overview-range-container">
          <p
            onClick={() => alert("This feature is not added yet!")}
            className="overview-range"
          >
            12 months
          </p>
          <p className="overview-range highlighted">Max</p>
        </div>
      </div>
      <div className="agent-overview-container">
        <div className="agent-overview-graph">
          <div className="agent-overview-graph-header-container">
            <p className="agent-overview-graph-header ">Total Investments</p>
            <p className="agent-overview-graph-value">
              {data!.data.reduce((acc, client) => {
                return acc + client.funds.length;
              }, 0)}
            </p>
          </div>
          <TimelineChart
            data={timeLineData!.data.monthsArray.slice().reverse()}
          />
        </div>
        <div className="agent-overview-stats">
          <div className="agent-stats-item-container">
            <div className="item-container-logo">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 9.5C10.7614 9.5 13 7.37335 13 4.75C13 2.12665 10.7614 0 8 0C5.23858 0 3 2.12665 3 4.75C3 7.37335 5.23858 9.5 8 9.5ZM15.391 15.3212C15.7931 16.1705 16 17.0807 16 18H8H0C0 17.0807 0.206926 16.1705 0.608963 15.3212C1.011 14.4719 1.60028 13.7003 2.34315 13.0503C3.08601 12.4002 3.96793 11.8846 4.93853 11.5328C5.90914 11.1811 6.94942 11 8 11C9.05057 11 10.0909 11.1811 11.0615 11.5328C12.0321 11.8846 12.914 12.4002 13.6569 13.0503C14.3997 13.7003 14.989 14.4719 15.391 15.3212Z"
                  fill="url(#paint0_linear_403_30)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_403_30"
                    x1="6"
                    y1="-15.84"
                    x2="-14.5273"
                    y2="-9.1583"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#174994" />
                    <stop offset="0.648204" stop-color="#9DC4FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="item-details">
              <p className="item-body">{data!.data.length}</p>
              <p className="item-head">Total Clients</p>
            </div>
          </div>

          <div className="agent-stats-item-container">
            <div className="item-container-logo">
              <p id="dollar-sign">$</p>
            </div>
            <div className="item-details">
              <p className="item-body">
                $
                {data!.data.reduce((acc, client) => {
                  return acc + client.totalInvested;
                }, 0)}
              </p>
              <p className="item-head">Portfoio Value</p>
            </div>
          </div>
        </div>
      </div>
      <div className="client-container-head">
        <p className="heading">Your Clients</p>
        <Link to="/user/add-client" className="add-client-btn">
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
                  key={client._id}
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

export default Dashboard;
