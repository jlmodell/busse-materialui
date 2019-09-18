import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const _url = "https://busse-nestjs-api.herokuapp.com/sales/distinct/item-list/";

const Selector = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    start: new Date(props.sales.start).toISOString().substring(0, 10),
    end: new Date(props.sales.end).toISOString().substring(0, 10),
    token: props.user.token,
    items: [],
    label: props.label || "label",
    helperText: props.helperText || "this is helper text"
  });

  const fetchItemList = (start, end, token) => {
    axios
      .get(`${_url}${start}/${end}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setState(prevState => ({ ...prevState, items: response.data[0].item }));
      });
  };

  useEffect(() => {
    fetchItemList(state.start, state.end, state.token);
  }, [state.token, state.start, state.end]);

  return (
    <TextField
      id="outlined-select-currency-native"
      select
      label={state.label}
      className={classes.textField}
      value={props.item}
      onChange={props.handleChange("item")} //temp
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu
        }
      }}
      helperText={state.helperText}
      margin="normal"
      variant="outlined"
    >
      <option value=""></option>
      {state.items.map(option => (
        <option
          key={option.name.split("|")[0]}
          value={option.name.split("|")[0]}
        >
          {option.name.split("|")[0]} {option.name.split("|")[1]}
        </option>
      ))}
    </TextField>
  );
};

const mapStateToProps = ({ sales, user }) => {
  return { sales, user };
};

export default connect(mapStateToProps)(Selector);
