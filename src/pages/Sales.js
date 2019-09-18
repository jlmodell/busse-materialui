import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
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
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      }
    }
  },
  {
    label: "Total Sales",
    name: "sales",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  },
  {
    label: "Total Rebates",
    name: "rebates",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  },
  {
    label: "Total Trade Discounts",
    name: "currentTradeDiscounts",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  },
  {
    label: "Total Mfg Costs",
    name: "costs",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  },
  {
    label: "Gross Profit Margin",
    name: "grossProfitMargin",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return parseFloat(value).toFixed(4) + "%";
      }
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
      <div className={classes.loaderDiv}>
        <Button variant="outlined" onClick={fetchSalesData}>
          Fetch Data
        </Button>
      </div>
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
