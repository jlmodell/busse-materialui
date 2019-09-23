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
                  <Button variant="outlined" onClick={console.log(props)}>
                    {data._id.iid} | {data._id.item}
                  </Button>
                </i>
              </TableCell>
              <TableCell key="5">
                <b>
                  {new Date(props.start).toISOString().substring(0, 10)} -{" "}
                  {new Date(props.end).toISOString().substring(0, 10)}
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
            <TableRow key="9">
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              <TableCell key="40" align={props.align}>
                {data.quantity.toFixed()}
              </TableCell>
              <TableCell key="39" align={props.align}>
                {data.normalizedTrailingTwelveMonths.quantity.toFixed()}
              </TableCell>
              <TableCell align={props.align} key="38">
                {data.trailingTwelveMonths.quantity.toFixed()}
              </TableCell>
            </TableRow>
            <TableRow key="10">
              <TableCell key="11">
                <b>Sales</b>
              </TableCell>
              <TableCell align={props.align} key="37">
                {data.sales.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key="12" align={props.align}>
                {data.normalizedTrailingTwelveMonths.sales.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key="13" align={props.align}>
                {data.trailingTwelveMonths.sales.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
            </TableRow>
            <TableRow key="14">
              <TableCell key="15">
                <b>Manufacturing Costs</b>
              </TableCell>
              <TableCell key="16" align={props.align}>
                {data.costs.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key="17" align={props.align}>
                {data.normalizedTrailingTwelveMonths.costs.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key="18" align={props.align}>
                {data.trailingTwelveMonths.costs.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
            </TableRow>
            <TableRow key="19">
              <TableCell key="20">
                <b>Periodic Rebates</b>
              </TableCell>
              <TableCell key="21" align={props.align}>
                {data.rebates.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key="22" align={props.align}>
                {data.normalizedTrailingTwelveMonths.rebates.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key="23" align={props.align}>
                {data.trailingTwelveMonths.rebates.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
            </TableRow>
            <TableRow key="24">
              <TableCell key={data.currentTradeDiscounts.toString() + "1"}>
                <b>Current Trade Discounts</b>
              </TableCell>
              <TableCell key="25" align={props.align}>
                {data.currentTradeDiscounts.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key="26" align={props.align}>
                {data.normalizedTrailingTwelveMonths.currentTradeDiscounts.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key="27" align={props.align}>
                {data.trailingTwelveMonths.currentTradeDiscounts.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
            </TableRow>
            <TableRow key="28">
              <TableCell key={data.grossProfit.toString() + "1"}>
                <b>Gross Profit</b>
              </TableCell>
              <TableCell key="29" align={props.align}>
                {data.grossProfit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </TableCell>
              <TableCell key="30" align={props.align}>
                {data.normalizedTrailingTwelveMonths.grossProfit.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
              <TableCell key="31" align={props.align}>
                {data.trailingTwelveMonths.grossProfit.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}
              </TableCell>
            </TableRow>
            <TableRow key="32">
              <TableCell key="33">
                <b>Gross Profit Margin</b>
              </TableCell>
              <TableCell key="34" align={props.align}>
                {data.grossProfitMargin ? data.grossProfitMargin.toFixed(4) : 0}
                %
              </TableCell>
              <TableCell key="35" align={props.align}>
                {data.normalizedTrailingTwelveMonths.grossprofitMargin
                  ? data.normalizedTrailingTwelveMonths.grossprofitMargin.toFixed(
                      4
                    )
                  : 0}
                %
              </TableCell>
              <TableCell key="36" align={props.align}>
                {data.trailingTwelveMonths.grossprofitMargin
                  ? data.trailingTwelveMonths.grossprofitMargin.toFixed(4)
                  : 0}
                %
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Paper>
  );
};

export default SingleItemTable;
