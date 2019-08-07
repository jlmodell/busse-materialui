import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE } from "../store/reducers/itemsReducer";

export default function Items() {
  const itemsReducer = useSelector(state => state.itemsReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>ITEMS: Busse Hospital Disposables</h1>
      <br />
      <div>{JSON.stringify(itemsReducer)}</div>
      <input
        type="checkbox"
        value="itemsReducer.toggle"
        onChange={() => dispatch({ type: TOGGLE })}
      />
    </div>
  );
}
