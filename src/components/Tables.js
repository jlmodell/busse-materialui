import React from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

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

const Sales = props => {
  const classes = useStyles();

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
        sort: true
      }
    },
    {
      label: "Total Sales",
      name: "sales",
      options: {
        sort: true
      }
    },
    {
      label: "Total Costs",
      name: "costs",
      options: {
        sort: true
      }
    },
    {
      label: "Gross Profit Margin",
      name: "grossProfitMargin",
      options: {
        sort: true
      }
    }
  ];

  const options = {
    filterType: "checkbox"
  };

  return (
    <div className={classes.root}>

      <div className={classes.dataTable}>
        <MUIDataTable
          title={`Sales List for period (${new Date(props.sales.start)
            .toISOString()
            .substring(0, 10)} - ${new Date(props.sales.end)
            .toISOString()
            .substring(0, 10)})`}
          data={props.sales.customerDetails}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return { sales };
};

export default connect(mapStateToProps)(Sales);
