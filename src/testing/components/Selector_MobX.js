import React from "react";
import { observer } from "mobx-react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";

import { sales } from "../store/mobx_sales";

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

const Selector = observer(props => {
  const classes = useStyles();
  const store = sales;

  React.useEffect(() => {
    if (store.end && store.start && store.token) {
      store.distinctItems();
    }
  }, [store]);

  const handleChange = e => {
    store.setItem(e.target.value);
    store.fetchSummary(e.target.value);
  };

  return (
    <TextField
      id="outlined-select-currency-native"
      select
      label={props.label}
      className={classes.textField}
      value={store.item}
      onChange={handleChange}
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu
        }
      }}
      helperText={props.helperText}
      margin="normal"
      variant="outlined"
    >
      <option value=""></option>
      {props.array.map(option => (
        <option
          key={option.name.split("|")[0]}
          value={option.name.split("|")[0]}
        >
          {option.name.split("|")[0]} {option.name.split("|")[1]}
        </option>
      ))}
    </TextField>
  );
});

export default Selector;
