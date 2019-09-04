import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

import { fetchItemsData, fetchIndividualSalesByItem } from "../store/actions";

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
    name: "_id.item",
    label: "Items",
    options: {
      filter: true,
      sort: true
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
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString();
      }
    }
  },
  {
    label: "Total Sales",
    name: "sales",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString();
      }
    }
  },
  {
    label: "Total Rebates",
    name: "rebates",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString();
      }
    }
  },
  {
    label: "Total Costs",
    name: "costs",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return value.toLocaleString();
      }
    }
  },
  {
    label: "Gross Profit Margin",
    name: "grossProfitMargin",
    options: {
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return `${value}%`;
      }
    }
  }
];

const Items = props => {
  const { fetchItemsData } = props;
  const classes = useStyles();

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    onRowClick: (rowData, rowState) => {
      props.fetchIndividualSalesByItem(rowData[1]);
      props.history.push({
        pathname: `/indivbyitem`,
        state: { iid: rowData[1], iname: rowData[0] }
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
        <Button variant="outlined" onClick={fetchItemsData}>
          Fetch Data
        </Button>
      </div>

      {props.sales.loading ? (
        renderLoader()
      ) : (
        <Tables
          options={options}
          columns={columns}
          tableName="Items"
          data={props.sales.itemDetails}
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
  { fetchItemsData, fetchIndividualSalesByItem }
)(Items);
