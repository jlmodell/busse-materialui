import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  fetchDistinctCustomers,
  storeCustomersInfo,
  isLoading
} from "../store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const api = "https://busse-nestjs-api.herokuapp.com";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const Sales = props => {
  const classes = useStyles();

  const startDate = new Date(props.sales.start).toISOString().substring(0, 10);
  const endDate = new Date(props.sales.end).toISOString().substring(0, 10);

  let tableRows = [];

  // useEffect(() => {
  //   fetchData();
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
        await localStorage.removeItem("distinctCustomers");
        await localStorage.setItem(
          "distinctCustomers",
          JSON.stringify(res.data[0].customer)
        );
        await props.fetchDistinctCustomers(res.data[0].customer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomerData = () => {
    props.sales.distinctCustomers.forEach(async function(x) {
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
        await localStorage.removeItem("customersData");
        await localStorage.setItem("customersData", JSON.stringify(tableRows));
        await props.storeCustomersInfo(tableRows);
      }
    });
  };

  return (
    <div className={classes.root}>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={fetchCustomerData}>Fetch Customer Info</button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Sales</TableCell>
            <TableCell align="right">Costs</TableCell>
            <TableCell align="right">GPM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sales.customers.map(row => (
            <TableRow key={row._id.cid}>
              <TableCell component="th" scope="row">
                {row._id.customer}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.sales}</TableCell>
              <TableCell align="right">{row.costs}</TableCell>
              <TableCell align="right">{row.grossProfitMargin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ sales, user }) => {
  console.log(sales, user);
  return { sales, user };
};

export default connect(
  mapStateToProps,
  { fetchDistinctCustomers, storeCustomersInfo, isLoading }
)(Sales);
