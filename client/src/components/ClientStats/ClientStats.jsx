import "./ClientStats.styles.css";

const Clientstats = ({
  gain,
  totalInv,
  currInvValue,
  absReturnPercent,
  funds,
}) => {
  console.log(gain, totalInv, currInvValue, absReturnPercent, funds);
  return (
    <div className="container">
      {/* create two rows using css flex each with two items */}
      <div className="row">
        <div className="stats-item">
          <div className="item-head head">Current Value</div>
          <div className="item-body">
            <span className="symbol">$</span>
            {currInvValue}
          </div>
        </div>
        <div className="stats-item">
          <div className="item-head head">Total Gain</div>
          <div className="item-body">
            <span className="symbol">$</span>
            {gain}
          </div>
        </div>
        <div className="stats-item">
          <div className="item-head head">Total Funds</div>
          <div className="item-body">{funds}</div>
        </div>
      </div>
      <div className="row">
        <div className="stats-item">
          <div className="item-head head">Total Inv.</div>
          <div className="item-body">
            <span className="symbol">$</span>
            {totalInv}
          </div>
        </div>
        <div className="stats-item">
          <div className="item-head head">% Returns</div>
          <div className="item-body">
            <span className="symbol">%</span>
            {absReturnPercent}
          </div>
        </div>
        <div className="stats-item">
          <div className="item-head head">Total Investment</div>
          <div className="item-body"><span className="symbol">$</span>40000</div>
        </div>
      </div>
    </div>
  );
};

export default Clientstats;
