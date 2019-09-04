import React from "react";
import { connect } from "react-redux";
import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

const columns = [
  {
    name: "_id.customer",
    label: "Customer",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    label: "ID",
    name: "_id.cid",
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
    label: "Total Rebates",
    name: "rebates",
    options: {
      sort: true
    }
  },
  {
    label: "Total Mfg Costs",
    name: "costs",
    options: {
      sort: true
    }
  },
  {
    label: "Total Trade Discounts",
    name: "currentTradeDiscounts",
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

const IndividualByItem = props => {
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked"
  };

  return (
    <div>
      <SetDates />

      {props.sales.loading ? (
        "Loading..."
      ) : (
        <Tables
          columns={columns}
          options={options}
          tableName={
            props.location.state.iname
              ? props.location.state.iname
              : "UNDEFINED"
          }
          data={props.sales.individualItems}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return { sales };
};

export default connect(mapStateToProps)(IndividualByItem);
