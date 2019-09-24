import React from "react";
import { observer } from "mobx-react";

import { makeStyles } from "@material-ui/core/styles";

import SetDates from "./components/SetDates_MobX";
import MuiDataTable from "./components/Tables_MobX";
import { CircularProgress } from "@material-ui/core";

import { sales } from "./store/mobx_sales";

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
    label: "Item",
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

const IndividualByCustomer = observer(props => {
  const classes = useStyles();
  const store = sales;

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked"
  };

  return (
    <div>
      <SetDates />
      <div className={classes.loaderDiv}>
        {store.loading && <CircularProgress className={classes.progress} />}
        {!store.loading && store.individualSales && (
          <MuiDataTable
            columns={columns}
            options={options}
            tableName={store.cid}
            data={store.individualSales}
          />
        )}
      </div>
    </div>
  );
});

export default IndividualByCustomer;
