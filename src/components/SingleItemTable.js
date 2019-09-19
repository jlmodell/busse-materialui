import React from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const SingleItemTable = props => {
  return (
    <Paper>
      {props.summary.map(data => (
        <Table key="1">
          <TableHead key="2">
            <TableRow key="3">
              <TableCell key="4">
                <i>
                  <Button variant="outlined" onClick={props.linkIndSales}>
                    {data._id.iid} | {data._id.item}
                  </Button>
                </i>
              </TableCell>
              <TableCell key="5">
                <b>
                  {props.start} - {props.end}
                </b>
              </TableCell>
              <TableCell key="6">
                <b>Normalized {props.numOfDays.toFixed(0)} Days</b>
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
              <TableCell align={props.align}>
                {data.quantity.toFixed()}
              </TableCell>
              <TableCell align={props.align}>
                {data.normalizedTrailingTwelveMonths.quantity.toFixed()}
              </TableCell>
              <TableCell align={props.align}>
                {data.trailingTwelveMonths.quantity.toFixed()}
              </TableCell>
            </TableRow>
            <TableRow key={data.sales}>
              <TableCell key={data.sales.toString() + "1"}>
                <b>Sales</b>
              </TableCell>
              <TableCell align={props.align} key={data.sales.toString() + "2"}>
                {data.sales.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key={data.sales.toString() + "3"} align={props.align}>
                {data.normalizedTrailingTwelveMonths.sales.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key={data.sales.toString() + "4"} align={props.align}>
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
              <TableCell key={data.costs.toString() + "2"} align={props.align}>
                {data.costs.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key={data.costs.toString() + "3"} align={props.align}>
                {data.normalizedTrailingTwelveMonths.costs.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key={data.costs.toString() + "4"} align={props.align}>
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
                align={props.align}
              >
                {data.rebates.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell
                key={data.rebates.toString() + "3"}
                align={props.align}
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
                align={props.align}
              >
                {data.trailingTwelveMonths.rebates.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
            </TableRow>
            <TableRow key={data.currentTradeDiscounts}>
              <TableCell key={data.currentTradeDiscounts.toString() + "1"}>
                <b>Current Trade Discounts</b>
              </TableCell>
              <TableCell
                key={data.currentTradeDiscounts.toString() + "2"}
                align={props.align}
              >
                {data.currentTradeDiscounts.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell
                key={data.currentTradeDiscounts.toString() + "3"}
                align={props.align}
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
                align={props.align}
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
                align={props.align}
              >
                {data.grossProfit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell
                key={data.grossProfit.toString() + "3"}
                align={props.align}
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
                align={props.align}
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
                align={props.align}
              >
                {data.grossProfitMargin.toFixed(4)}%
              </TableCell>
              <TableCell
                key={data.grossProfitMargin.toString() + "3"}
                align={props.align}
              >
                {data.normalizedTrailingTwelveMonths.grossprofitMargin.toFixed(
                  4
                )}
                %
              </TableCell>
              <TableCell
                key={data.grossProfitMargin.toString() + "4"}
                align={props.align}
              >
                {data.trailingTwelveMonths.grossprofitMargin.toFixed(4)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Paper>
  );
};

export default SingleItemTable;
