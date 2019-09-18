import React from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";

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

const Sales = withRouter(props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.dataTable}>
        <MUIDataTable
          title={`${props.tableName} List for period (${new Date(
            props.sales.start
          )
            .toISOString()
            .substring(0, 10)} - ${new Date(props.sales.end)
            .toISOString()
            .substring(0, 10)})`}
          data={props.data}
          columns={props.columns}
          options={props.options}
        />
      </div>
    </div>
  );
});

const mapStateToProps = ({ sales }) => {
  return { sales };
};

export default connect(mapStateToProps)(Sales);
