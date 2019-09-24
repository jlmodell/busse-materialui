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
    label: "Total Costs",
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

const Items = observer(props => {
  const classes = useStyles();
  const store = sales;

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    onRowClick: (rowData, rowState) => {
      store.fetchIndividualSalesByItem(rowData[1]);
      store.setIid(rowData[1], rowData[0]);
      props.history.push({
        pathname: `/indivbyitem`,
        state: { iid: rowData[1], iname: rowData[0] }
      });
    }
  };

  React.useEffect(() => {
    if (store.start && store.end) {
      store.fetchPeriodData();
    }
  }, []);

  return (
    <div>
      <SetDates />
      <div className={classes.loaderDiv}>
        {store.loading && <CircularProgress className={classes.progress} />}
        {!store.loading && store.itemDetails && (
          <MuiDataTable
            options={options}
            columns={columns}
            tableName="Items"
            data={store.itemDetails}
          />
        )}
      </div>
    </div>
  );
});

export default Items;
