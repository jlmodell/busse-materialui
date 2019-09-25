import React from "react";
import { navigate } from "@reach/router";
import { observer } from "mobx-react";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { sales } from "./store/mobx_sales";
import { users } from "./store/mobx_users";

import SetDates from "./components/SetDates_MobX";
import Selector from "./components/Selector_MobX";
import SingleItemTable from "./components/SingleItemTable_MobX";
import Chart from "./components/Chart_MobX";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  loaderDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  selector: {
    marginTop: "2.5rem",
    marginBottom: "2.5rem"
  },
  dataTable: {
    padding: "2rem 1rem 5rem 1rem"
  },
  chart: {
    padding: "2rem 1rem 5rem 1rem"
  }
}));

const ItemReview = observer(() => {
  const classes = useStyles();
  const store = sales;
  const user = users;

  if (!user.token) {
    navigate("/login");
  }
  return (
    <div>
      <SetDates />
      <div className={classes.loaderDiv}>
        <div className={classes.selector}>
          <Selector
            array={store.distinctItemsArray}
            label="Item"
            helperText="Choose an Item to Analyze"
          />
        </div>

        {sales.loading && <CircularProgress className={classes.progress} />}

        {!sales.loading && (
          <div className={classes.dataTable}>
            <SingleItemTable
              summary={store.summary}
              start={store.start}
              end={store.end}
              numOfDays={store.numOfDays}
              align="right"
            />
          </div>
        )}

        {!sales.loading && sales.chartCustomers.length > 0 && (
          <div className={classes.chart}>
            <Chart customers={store.chartCustomers} sales={store.chartSales} />
          </div>
        )}
      </div>
    </div>
  );
});

export default ItemReview;
