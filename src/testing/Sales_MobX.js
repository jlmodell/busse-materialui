import React from "react";
import { observer } from "mobx-react";
import { navigate } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";

import SetDates from "./components/SetDates_MobX";
import MuiDataTable from "./components/Tables_MobX";
import { CircularProgress } from "@material-ui/core";

import { sales } from "./store/mobx_sales";
import { users } from "./store/mobx_users";

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

const Sales = observer(props => {
  const classes = useStyles();
  const store = sales;
  const user = users;

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    onRowClick: (rowData, rowState) => {
      store.fetchIndividualSalesByCust(rowData[1]);
      store.setCid(rowData[1], rowData[0]);
      navigate("/indivbycust");
    }
  };

  React.useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
    if (store.start && store.end && store.token) {
      store.fetchPeriodData();
    }
  }, [store, user]);

  return (
    <div>
      <SetDates />
      <div className={classes.loaderDiv}>
        {store.loading && <CircularProgress className={classes.progress} />}
        {!store.loading && store.customerDetails && (
          <MuiDataTable
            options={options}
            columns={columns}
            tableName="Sales"
            data={store.customerDetails}
          />
        )}
      </div>
    </div>
  );
});

export default Sales;
