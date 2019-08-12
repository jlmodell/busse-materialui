import React, { useState } from "react";
import axios from "axios";

export default function Prices() {
  const [state, setState] = useState({
    item: "",
    distributor: "",
    terms: {
      payment_terms: null,
      admin_fees: null,
      trace_fees: null,
      freight: null,
      commission: null,
      labor_costs: null,
      cash_discount: null
    },
    items: {
      item: "",
      cost: null
    }
  });

  const dataFetch = async () => {
    const item = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/item/${state.item}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDRjNmMzNjRiZTdjOTAwMTc1ZWIzNDEiLCJlbWFpbCI6ImFiY0BtZS5jb20iLCJtc2ciOiJ0b2tlbiBleHBpcmVzIGluIDYgaHJzIiwiaGlkZGVubXNnIjoiPDMgbWVhZ2FuIiwiaWF0IjoxNTY1NjM3NDQ5LCJleHAiOjE1NjU2NTkwNDl9.pQa7s-LY-_J63DGxDLoCZJqbHYyQqr8ReLn0V0a9--0"
        }
      }
    );
    console.log(item.data[0]);
    setState({
      ...state.items,
      items: item.data[0]
    });

    const distributor = await axios.get(
      `https://busse-nestjs-api.herokuapp.com/distributor/${state.distributor}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDRjNmMzNjRiZTdjOTAwMTc1ZWIzNDEiLCJlbWFpbCI6ImFiY0BtZS5jb20iLCJtc2ciOiJ0b2tlbiBleHBpcmVzIGluIDYgaHJzIiwiaGlkZGVubXNnIjoiPDMgbWVhZ2FuIiwiaWF0IjoxNTY1NjM3NDQ5LCJleHAiOjE1NjU2NTkwNDl9.pQa7s-LY-_J63DGxDLoCZJqbHYyQqr8ReLn0V0a9--0"
        }
      }
    );
    console.log(distributor.data[0]);
    setState({
      ...state,
      terms: distributor.data[0]
    });

    console.log(state);
  };

  console.log(state);

  return (
    <div>
      <h1>Prices: Busse Hospital Disposables</h1>
      <form>
        <label>Item</label>
        <input
          value={state.item}
          name="item"
          onChange={e => setState({ ...state, item: e.target.value })}
        />
        <label>Distributor</label>
        <input
          value={state.distributor}
          name="distributor"
          onChange={e => setState({ ...state, distributor: e.target.value })}
        />
      </form>
      <h1>
        {state.distributor} {state.item}
      </h1>
      {state.item && state.distributor ? (
        <button onClick={dataFetch}>Fetch Data</button>
      ) : (
        ""
      )}
    </div>
  );
}
