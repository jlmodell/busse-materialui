import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
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

const api = "https://busse-nestjs-api.herokuapp.com";

const Sales = props => {
  const [state, setState] = useState({
    distinctCustomers:
      JSON.parse(localStorage.getItem("distinctCustomers")) || [],
    customers: JSON.parse(localStorage.getItem("customersData")) || []
  });

  const classes = useStyles();

  const startDate = new Date(props.sales.start).toISOString().substring(0, 10);
  const endDate = new Date(props.sales.end).toISOString().substring(0, 10);

  let tableRows = [];

  // useEffect(() => {
  //   fetchData();
  //   fetchCustomerData();
  // }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${api}/sales/distinct/cust/${startDate}/${endDate}`,
        {
          headers: { Authorization: `Bearer ${props.user.token}` }
        }
      );
      if (res.status === 200) {
        // await localStorage.removeItem("distinctCustomers");
        await localStorage.setItem(
          "distinctCustomers",
          JSON.stringify(res.data[0].customer)
        );
        await setState({ ...state, distinctCustomers: res.data[0].customer });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomerData = () => {
    state.distinctCustomers.forEach(async function(x) {
      const res = await axios.get(
        `${api}/sales/summary/cust/${
          x.name.split("|")[1]
        }/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`
          }
        }
      );
      if (res.status === 200) {
        tableRows.push(res.data[0]);
        // await localStorage.removeItem("customersData");
        await localStorage.setItem("customersData", JSON.stringify(tableRows));
      }
    });
  };

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
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={fetchCustomerData}>Fetch Customer Info</button>
      <div className={classes.dataTable}>
        <MUIDataTable
          title={`Sales List for period (${new Date(props.sales.start)
            .toISOString()
            .substring(0, 10)} - ${new Date(props.sales.end)
            .toISOString()
            .substring(0, 10)})`}
          data={state.customers}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales, user }) => {
  return { sales, user };
};

export default connect(mapStateToProps)(Sales);
