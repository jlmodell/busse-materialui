import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

import {
  fetchSalesData,
  fetchIndividualSalesByCustomer
} from "../store/actions";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  loaderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const columns = [
  {
    name: "_id.customer",
    label: "Customers",
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

const Sales = props => {
  const { fetchSalesData } = props;
  const classes = useStyles();

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    onRowClick: (rowData, rowState) => {
      props.fetchIndividualSalesByCustomer(rowData[1]);
      props.history.push({
        pathname: `/indivbycust`,
        state: { cid: rowData[1], cname: rowData[0] }
      });
    }
  };

  const renderLoader = () => {
    return (
      <div className={classes.loaderDiv}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  };

  return (
    <div>
      <SetDates />
      <button onClick={fetchSalesData}>Fetch Data</button>
      {props.sales.loading ? (
        renderLoader()
      ) : (
        <Tables
          options={options}
          columns={columns}
          tableName="Sales"
          data={props.sales.customerDetails}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return { sales };
};

export default connect(
  mapStateToProps,
  { fetchSalesData, fetchIndividualSalesByCustomer }
)(Sales);
