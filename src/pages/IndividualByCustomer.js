import React from "react";
import { connect } from 'react-redux'
import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

const columns = [
  {
    name: "_id.item",
    label: "Item",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    label: "ID",
    name: "_id.iid",
    options: {
      filter: true
    }
  },
  {
    label: "Qty Sold",
    name: "quantity",
    options: {
      sort: true
    }
  },
  {
    label: "Total Sales",
    name: "sales",
    options: {
      sort: true
    }
  },
  {
    label: "Total Costs",
    name: "costs",
    options: {
      sort: true
    }
  },
  {
    label: "Gross Profit Margin",
    name: "grossProfitMargin",
    options: {
      sort: true
    }
  }
];

const IndividualByCustomer = (props) => {

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
  };

  return (
    <div>
      <SetDates />

      {props.sales.loading ? "Loading..." : <Tables columns={columns} options={options} tableName={props.location.state.cname ? props.location.state.cname : "UNDEFINED"} data={props.sales.individualSales} />}
    </div>
  );
}

const mapStateToProps = ({sales}) => {
  return { sales }
}

export default connect(mapStateToProps)(IndividualByCustomer)