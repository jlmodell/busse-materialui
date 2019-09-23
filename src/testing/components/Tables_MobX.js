import React from "react";
import { observer } from "mobx-react";

import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";

import { sales } from "../store/mobx_sales";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  dataTable: {
    padding: "0 1rem 5rem 1rem"
  }
}));

const MuiDataTable = observer(
  withRouter(props => {
    const classes = useStyles();
    const store = sales;

    return (
      <div className={classes.root}>
        <div className={classes.dataTable}>
          <MUIDataTable
            title={`${props.tableName} List for period (${new Date(store.start)
              .toISOString()
              .substring(0, 10)} - ${new Date(store.end)
              .toISOString()
              .substring(0, 10)})`}
            data={props.data}
            columns={props.columns}
            options={props.options}
          />
        </div>
      </div>
    );
  })
);

export default MuiDataTable;
