import React, { useState } from "react";
import {connect} from 'react-redux'

import { DatePicker } from "@material-ui/pickers";

const Sales = (props) => {
  const [state, setState] = useState({
    start: '',
    end: ''
  })
  console.log(props, state)

  return (
    <>
      <DatePicker
        autoOk
        variant="static"
        openTo="date"
        value={state.start}
        onChange={(date) => setState({...state, start: date})}
      />

      <DatePicker
        autoOk
        orientation="static"
        variant="static"
        openTo="date"
        value={state.end}
        onChange={(date) => setState({...state, end: date})}
      />
    </>
  );
};

const mapStateToProps = ({sales}) => {
  return {sales}
}

export default connect(mapStateToProps)(Sales);
