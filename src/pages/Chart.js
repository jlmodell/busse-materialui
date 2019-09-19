import React from "react";
import { connect } from "react-redux";

import Chart from "../components/Chart";

const DisplayChart = props => {
  console.log(props);

  const customers = [];
  const sales = [];

  const array = props.sales.individualItems;

  array.forEach(function(x) {
    customers.push(x._id.customer);
    sales.push(x.sales);
  });

  return (
    <div className="chart">
      <Chart
        customers={customers}
        sales={sales}
        name={props.match.params.name}
        id={props.match.params.id}
      />
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return { sales };
};

export default connect(mapStateToProps)(DisplayChart);
