import React from "react";
import { observer } from "mobx-react";
import { DatePicker } from "@material-ui/pickers";

import { sales } from "../store/mobx_sales";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 4)
  },
  dateContainer: {
    display: "flex",
    justifyContent: "center"
  },
  individual: {
    margin: "0 1rem"
  }
}));

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const maxDate = new Date(currentYear, lastMonth, 0);
const minDate = new Date(2012, 1, 1);
const initialStartDate = new Date(currentYear, lastMonth - 1, 1);

const SetDates = observer(() => {
  const classes = useStyles();
  const store = sales;

  return (
    <div className={classes.root}>
      <div className={classes.dateContainer}>
        <DatePicker
          className={classes.individual}
          minDate={minDate}
          maxDate={maxDate}
          initialFocusedDate={initialStartDate}
          autoOk
          variant="dialog"
          inputVariant="outlined"
          label="Start"
          openTo="date"
          value={store.start}
          onChange={date => {
            localStorage.setItem("start", date);
            store.setStart(date);
          }}
        />

        <DatePicker
          className={classes.individual}
          minDate={minDate}
          maxDate={maxDate}
          initialFocusedDate={maxDate}
          autoOk
          variant="dialog"
          inputVariant="outlined"
          label="End"
          openTo="date"
          value={store.end}
          onChange={date => {
            localStorage.setItem("end", date);
            store.setEnd(date);
          }}
        />
      </div>
    </div>
  );
});

export default SetDates;
