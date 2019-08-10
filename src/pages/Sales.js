import React from "react";
import { connect } from 'react-redux'
import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

import { fetchData } from '../store/actions'

const Sales = (props) => {
  const { fetchData } = props

  return (
    <div>
      <SetDates />
      <button onClick={fetchData}>Fetch Data</button>
      {props.sales.loading ? "Loading..." : <Tables />}
    </div>
  );
}

const mapStateToProps = ({sales}) => {
  return { sales }
}

export default connect(mapStateToProps, { fetchData })(Sales)