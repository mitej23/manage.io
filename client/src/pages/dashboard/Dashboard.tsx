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
      <div className="container-title">
        <p>Overview</p>
      </div>
      <div className="agent-overview-container">
        <div className="agent-overview-stats">
          <div className="agent-stats-item-container">
            <p className="item-head">Total Clients</p>
            <p className="item-body">{data!.data.length}</p>
          </div>
          <div className="agent-stats-item-container">
            <p className="item-head">Total Investments</p>
            <p className="item-body">
              {data!.data.reduce((acc, client) => {
                return acc + client.funds.length;
              }, 0)}
            </p>
          </div>
          <div className="agent-stats-item-container">
            <p className="item-head">Portfoio Value</p>
            <p className="item-body">
              $
              {data!.data.reduce((acc, client) => {
                return acc + client.totalInvested;
              }, 0)}
            </p>
          </div>
        </div>
        <div className="agent-overview-graph">
          <TimelineChart
            data={timeLineData!.data.monthsArray.slice().reverse()}
          />
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

export default Dashboard;
