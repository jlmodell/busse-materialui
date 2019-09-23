import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Paper } from "@material-ui/core";

const Chart = props => {
  const data = {
    labels: props.customers,
    datasets: [
      {
        label: "Sales for Period By Customer",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.sales
      }
    ]
  };
  return (
    <Paper>
      <div style={{ padding: "2rem", width: "100%" }}>
        <HorizontalBar data={data} width={600} height={700} />
      </div>
    </Paper>
  );
};

export default Chart;
