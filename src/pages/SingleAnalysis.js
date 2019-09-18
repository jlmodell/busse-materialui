import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import Chart from "../components/Chart";
import CircularProgress from "@material-ui/core/CircularProgress";

import SetDates from "../components/SetDates";
import Selector from "../components/Selector";

import { fetchIndividualSalesByItem } from "../store/actions";

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
    padding: "2rem 1rem 5rem 1rem",
    marginBottom: "2.5rem"
  }
}));

// need columns, need data

const _salesSummaryByItemUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/summary/item/";

const SingleAnalysis = props => {
  const classes = useStyles();

  const [state, setState] = useState({
    start: new Date(props.sales.start).toISOString().substring(0, 10),
    end: new Date(props.sales.end).toISOString().substring(0, 10),
    token: props.user.token,

    item: localStorage.getItem("item") || "",
    summary: JSON.parse(localStorage.getItem("summary")) || [],
    loading: false,
    align: "right",
    numOfDays:
      (new Date(props.sales.end).getTime() -
        new Date(props.sales.start).getTime()) /
      (1000 * 60 * 60 * 24)
  });

  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = () => {
    setState(prevState => ({
      ...prevState,
      loading: true
    }));

    try {
      axios
        .get(
          `${_salesSummaryByItemUrl}${state.item}/${state.start}/${state.end}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`
            }
          }
        )
        .then(res => {
          const summary = res.data;
          localStorage.setItem("summary", JSON.stringify(summary));

          return summary;
        })
        .then(summary => {
          props.fetchIndividualSalesByItem(summary[0]._id.iid);
          return summary;
        })
        .then(summary => {
          const array = props.sales.individualItems;
          let custList = customers;
          let saleList = sales;
          localStorage.removeItem("c");
          localStorage.removeItem("s");

          array.forEach(function(x) {
            custList.push(x._id.customer);
            saleList.push(x.sales);
          });

          localStorage.setItem("custList", JSON.stringify(custList));
          localStorage.setItem("saleList", JSON.stringify(saleList));

          return { summary, custList, saleList };
        })
        .then(({ summary, custList, saleList }) => {
          setCustomers([...custList]);
          setSales([...saleList]);
          setState(prevState => ({ ...prevState, summary, loading: false }));
          console.log(customers, sales);
        });
    } catch (err) {
      throw new err();
    }
  };

  const handleChange = name => event => {
    setState(prevState => ({
      ...prevState,
      [name]: event.target.value
    }));
    localStorage.setItem([name], event.target.value);
  };

  const renderLoader = () => {
    return (
      <div className={classes.loaderDiv}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  };

  const renderChart = () => {
    console.log(sales, customers);
    if (sales.length > 0 && customers.length > 0) {
      return <Chart customers={customers} sales={sales} />;
    } else {
      return (
        <p>
          <i>placeholder</i>
        </p>
      );
    }
  };

  const linkIndSales = () => {
    props.fetchIndividualSalesByItem(state.summary[0]._id.iid);

    props.history.push({
      pathname: `/indivbyitem`,
      state: {
        iid: state.summary[0]._id.iid,
        iname: state.summary[0]._id.item
      }
    });
  };

  const buildTable = () => {
    return (
      <div className={classes.dataTable}>
        <Paper>
          {state.summary.map(data => (
            <Table key="1">
              <TableHead key="2">
                <TableRow key="3">
                  <TableCell key="4">
                    <i>
                      <Button variant="outlined" onClick={linkIndSales}>
                        {data._id.iid} | {data._id.item}
                      </Button>
                    </i>
                  </TableCell>
                  <TableCell key="5">
                    <b>
                      {state.start} - {state.end}
                    </b>
                  </TableCell>
                  <TableCell key="6">
                    <b>Normalized {state.numOfDays.toFixed(0)} Days</b>
                  </TableCell>
                  <TableCell key="7">
                    <b>Trailing 12 Months</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody key="8">
                <TableRow key={data.quantity}>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align={state.align}>
                    {data.quantity.toFixed()}
                  </TableCell>
                  <TableCell align={state.align}>
                    {data.normalizedTrailingTwelveMonths.quantity.toFixed()}
                  </TableCell>
                  <TableCell align={state.align}>
                    {data.trailingTwelveMonths.quantity.toFixed()}
                  </TableCell>
                </TableRow>
                <TableRow key={data.sales}>
                  <TableCell key={data.sales.toString() + "1"}>
                    <b>Sales</b>
                  </TableCell>
                  <TableCell
                    align={state.align}
                    key={data.sales.toString() + "2"}
                  >
                    {data.sales.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell
                    key={data.sales.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.sales.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                  <TableCell
                    key={data.sales.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.sales.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                </TableRow>
                <TableRow key={data.costs}>
                  <TableCell key={data.costs.toString() + "1"}>
                    <b>Manufacturing Costs</b>
                  </TableCell>
                  <TableCell
                    key={data.costs.toString() + "2"}
                    align={state.align}
                  >
                    {data.costs.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell
                    key={data.costs.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.costs.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                  <TableCell
                    key={data.costs.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.costs.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                </TableRow>
                <TableRow key={data.rebates}>
                  <TableCell key={data.rebates.toString() + "1"}>
                    <b>Periodic Rebates</b>
                  </TableCell>
                  <TableCell
                    key={data.rebates.toString() + "2"}
                    align={state.align}
                  >
                    {data.rebates.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell
                    key={data.rebates.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.rebates.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                  <TableCell
                    key={data.rebates.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.rebates.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow key={data.currentTradeDiscounts}>
                  <TableCell key={data.currentTradeDiscounts.toString() + "1"}>
                    <b>Current Trade Discounts</b>
                  </TableCell>
                  <TableCell
                    key={data.currentTradeDiscounts.toString() + "2"}
                    align={state.align}
                  >
                    {data.currentTradeDiscounts.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell
                    key={data.currentTradeDiscounts.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.currentTradeDiscounts.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                  <TableCell
                    key={data.currentTradeDiscounts.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.currentTradeDiscounts.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow key={data.grossProfit}>
                  <TableCell key={data.grossProfit.toString() + "1"}>
                    <b>Gross Profit</b>
                  </TableCell>
                  <TableCell
                    key={data.grossProfit.toString() + "2"}
                    align={state.align}
                  >
                    {data.grossProfit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell
                    key={data.grossProfit.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.grossProfit.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                  <TableCell
                    key={data.grossProfit.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.grossProfit.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow key={data.grossProfitMargin}>
                  <TableCell key={data.grossProfitMargin.toString() + "1"}>
                    <b>Gross Profit Margin</b>
                  </TableCell>
                  <TableCell
                    key={data.grossProfitMargin.toString() + "2"}
                    align={state.align}
                  >
                    {data.grossProfitMargin.toFixed(4)}%
                  </TableCell>
                  <TableCell
                    key={data.grossProfitMargin.toString() + "3"}
                    align={state.align}
                  >
                    {data.normalizedTrailingTwelveMonths.grossprofitMargin.toFixed(
                      4
                    )}
                    %
                  </TableCell>
                  <TableCell
                    key={data.grossProfitMargin.toString() + "4"}
                    align={state.align}
                  >
                    {data.trailingTwelveMonths.grossprofitMargin.toFixed(4)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </Paper>
      </div>
    );
  };

  // Selector needs label, helperText, data

  return (
    <div>
      <SetDates />

      <div className={classes.loaderDiv}>
        <div className={classes.selector}>
          <Selector
            label="Item"
            helperText="Choose an Item to Analyze"
            handleChange={handleChange}
            item={state.item}
          />
        </div>
        <Button variant="outlined" onClick={fetchData}>
          Fetch Data
        </Button>
        {state.loading ? renderLoader() : null}
        <div className="container">
          {state.summary.length > 0 ? buildTable() : null}
        </div>
        <div className="chart">{renderChart()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales, user }) => {
  return { sales, user };
};

export default connect(
  mapStateToProps,
  { fetchIndividualSalesByItem }
)(SingleAnalysis);
