import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SetDates from "../components/SetDates";
import Tables from "../components/Tables";
import { Button, CircularProgress } from "@material-ui/core";

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
    label: "Avg Price Sold",
    name: "avgPrice",
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
    label: "Avg Price After Rebates",
    name: "afterRebateAvgPrice",
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

const IndividualByItem = props => {
  const classes = useStyles();

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked"
  };

  const renderLoader = () => {
    return (
      <div className={classes.loaderDiv}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  };

  const newTo = {
    pathname: `/chart/${props.location.state.iname.replace("/", "")}/${
      props.location.state.iid
    }`,
    iname: props.location.state.iname,
    iid: props.location.state.iid
  };

  return (
    <div>
      <SetDates />

      <Link to={newTo} target="_blank">
        <Button variant="outlined">Fetch Chart</Button>
      </Link>

      {props.sales.loading ? (
        renderLoader()
      ) : (
        <Tables
          columns={columns}
          options={options}
          tableName={
            props.sales.individualItems &&
            props.location.state.iid | props.location.state.iname
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
