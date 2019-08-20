import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

import "./Prices.css";

const Prices = props => {
  const [state, setState] = useState({
    item: "",
    distributor: "",
    distributors: [],
    newPrice: null,
    payment_terms: null,
    admin_fees: null,
    trace_fees: null,
    freight: null,
    commission: null,
    labor_costs: null,
    cash_discount: null,
    cost: null,
    sales: null,
    avgPrice: null,
    quantity: null,
    start: moment()
      .subtract(12, "months")
      .startOf("month")
      .format()
      .substring(0, 10),
    end: moment()
      .subtract(1, "months")
      .endOf("month")
      .format()
      .substring(0, 10)
  });

  const headers = {
    Authorization: `Bearer ${props.state.user.token}`
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    const res = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/distributor/`,
      {
        headers
      }
    );
    setState({
      ...state,
      distributors: res.data[0].distributor
    });
  };

  const dataFetch = async () => {
    const item = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/item/${state.item}`,
      {
        headers
      }
    );

    const distributor = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/distributor/${state.distributor}`,
      {
        headers
      }
    );

    const avgPrice = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/sales/avg-price/${
        state.distributor
      }/${state.item}/${state.start}/${state.end}`,
      {
        headers
      }
    );

    console.log(state);

    setState({
      ...state,
      cost: item.data[0].cost,
      payment_terms: distributor.data[0].payment_terms,
      admin_fees: distributor.data[0].admin_fees,
      trace_fees: distributor.data[0].trace_fees,
      freight: distributor.data[0].freight,
      commission: distributor.data[0].commission,
      labor_costs: distributor.data[0].labor_costs,
      cash_discount: distributor.data[0].cash_discount,
      avgPrice: avgPrice.data[0].avgSalePrice,
      quantity: avgPrice.data[0].sales,
      sales: avgPrice.data[0].quantity
    });
  };

  return (
    <div className="container">
      <h1>Prices: Busse Hospital Disposables</h1>
      <form>
        <label>Item</label>
        <input
          value={state.item}
          name="item"
          onChange={e => setState({ ...state, item: e.target.value })}
        />
        <label>Distributor</label>
        <select
          value={state.distributor}
          name="distributor"
          onChange={e => setState({ ...state, distributor: e.target.value })}
        >
          <option value="" />
          {state.distributors.map((d, i) => (
            <option key={i} value={d.id}>
              {d.id}
            </option>
          ))}
        </select>
      </form>
      <br />
      {state.distributor && state.item ? (
        <React.Fragment>
          <table className="tables">
            <tr>
              <th>Item</th>
              <th>Current Cost</th>
              <th>Distributor</th>
              <th>Payment Terms</th>
              <th>Admin Fees</th>
              <th>Trace Fees</th>
              <th>Freight</th>
              <th>Commission</th>
              <th>Labor Costs</th>
              <th>Cash Discount</th>
            </tr>
            <td>{state.item}</td>
            <td>{state.cost}</td>
            <td>{state.distributor}</td>
            <td>{state.payment_terms}</td>
            <td>{state.admin_fees}</td>
            <td>{state.trace_fees}</td>
            <td>{state.freight}</td>
            <td>{state.commission}</td>
            <td>{state.labor_costs}</td>
            <td>{state.cash_discount}</td>
          </table>
          <br />
          <table className="tables">
            <tr>
              <th>Item</th>
              <th>12 Month Average Price</th>
              <th>Re-calculated Cost</th>
              <th>Gross Profit (cs)</th>
              <th>Gross Profit Margin (cs)</th>
              <th>12 Month Qty Sold</th>
              <th>12 Month Total Sales ($)</th>
            </tr>
            <td>{state.item}</td>
            <td>{state.avgPrice}</td>
            <td>
              {state.avgPrice *
                (state.payment_terms +
                  state.admin_fees +
                  state.trace_fees +
                  state.commission +
                  state.cash_discount) +
                state.cost}
            </td>
            <td>
              {state.avgPrice -
                (state.avgPrice *
                  (state.payment_terms +
                    state.admin_fees +
                    state.trace_fees +
                    state.commission +
                    state.cash_discount) +
                  state.cost)}
            </td>
            <td>
              {(state.avgPrice -
                (state.avgPrice *
                  (state.payment_terms +
                    state.admin_fees +
                    state.trace_fees +
                    state.commission +
                    state.cash_discount) +
                  state.cost)) /
                state.avgPrice}
            </td>
            <td>{state.sales}</td>
            <td>{state.quantity}</td>
          </table>
        </React.Fragment>
      ) : (
        ""
      )}
      <br />
      {state.item && state.distributor ? (
        <button onClick={dataFetch}>Fetch Data</button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(Prices);
