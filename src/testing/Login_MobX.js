import React from "react";
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import SetDates from "./components/SetDates_MobX";
import {
  Typography,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { users } from "./store/mobx_users";
import { sales } from "./store/mobx_sales";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 4)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    flex: 1
  },
  formControl: {
    margin: theme.spacing(1)
  },
  button: {
    background: "teal",
    color: "white",
    marginRight: "1rem",
    marginTop: "1rem"
  },
  typography: {
    display: "flex",
    justifyContent: "center"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem"
  },
  dateContainer: {
    marginTop: "2rem"
  }
}));

const plugins = {
    dvr: dvr(validatorjs)
}

const fields = {
    email: {
        label: 'Email',
        placeholder: 'Enter your complete Email',
        rules: 'required|email|string',
    },
    password: {
        label: 'Password',
        placeholder: 'Enter your Password',
        rules: 'required|string'
    }
}

const h

const Login = observer(
  withRouter(props => {
    const classes = useStyles();
    const store = users;
    const salesStore = sales;

    const handleSubmit = e => {
      e.preventDefault();
      localStorage.clear();
      store.login();
    };

    return (
      <div className={classes.root}>
        <Typography className={classes.typography} variant="h2">
          Login
        </Typography>
        <div className="dateContainer">
          <SetDates />
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <FormControl fullWidth>
              <InputLabel>E-mail</InputLabel>
              <Input
                className={classes.input}
                type="email"
                id="email"
                value={store.email}
                onChange={e => store.setEmail(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input
                className={classes.input}
                type={store.showPassword ? "text" : "password"}
                id="password"
                value={store.password}
                onChange={e => store.setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => store.setShowPassword()}
                    >
                      {store.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              className={classes.button}
              disabled={
                store.email &&
                store.password &&
                salesStore.start &&
                salesStore.end
                  ? ""
                  : "true"
              }
            >
              Login
            </Button>
            <Button
              disabled="true"
              component={Link}
              to="/register"
              className={classes.button}
            >
              Register
            </Button>
          </div>
        </form>
        {store.error && <p>{store.error}</p>}
      </div>
    );
  })
);

export default Login;
