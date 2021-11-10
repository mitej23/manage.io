import React from "react";
import "./GraphTimelineContainer.styles.css";

const GraphTimelineContainer = ({ props }) => {
  const {
    data,
    setReversedData,
    setChartIndex,
    indexOfDoi,
    chartIndex,
    yearIndex,
    threeYearIndex,
  } = props;
  return (
    <div className="graph-timeline-conatiner">
      <p
        onClick={() => {
          setReversedData(data.data.data.data.slice(0, indexOfDoi).reverse());
          setChartIndex(indexOfDoi);
        }}
        className={chartIndex === indexOfDoi ? "select" : ""}
      >
        Inv.
      </p>
      <p
        onClick={() => {
          setReversedData(data.data.data.data.slice(0, yearIndex).reverse());
          setChartIndex(yearIndex);
        }}
        className={chartIndex === yearIndex ? "select" : ""}
      >
        1Y
      </p>
      <p
        onClick={() => {
          setReversedData(
            data.data.data.data.slice(0, threeYearIndex).reverse()
          );
          setChartIndex(threeYearIndex);
        }}
        className={chartIndex === threeYearIndex ? "select" : ""}
      >
        3Y
      </p>
      <p
        onClick={() => {
          setReversedData(data.data.data.data.slice().reverse());
          setChartIndex(data.data.data.data.length);
        }}
        className={chartIndex === data.data.data.data.length ? "select" : ""}
      >
        All
      </p>
    </div>
  );
};

export default GraphTimelineContainer;
