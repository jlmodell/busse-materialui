import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { login } from "../store/actions";

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
    justifyContent: "center"
  }
}));

const Login = withRouter(props => {
  const classes = useStyles();
  const [state, setState] = useState({
    showPassword: false,
    email: "",
    password: ""
  });
  const user = {
    email: state.email,
    password: state.password
  };

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.clear();
    props.login(user);
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h2">
        Login
      </Typography>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <FormControl fullWidth>
            <InputLabel>E-mail</InputLabel>
            <Input
              className={classes.input}
              type="email"
              id="email"
              value={state.email}
              onChange={e => setState({ ...state, email: e.target.value })}
            />
          </FormControl>
        </div>
        <div className="form-control">
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              className={classes.input}
              type={state.showPassword ? "text" : "password"}
              id="password"
              value={state.password}
              onChange={e => setState({ ...state, password: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setState({ ...state, showPassword: !state.showPassword })
                    }
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className={classes.buttonContainer}>
          <Button type="submit" className={classes.button}>
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
    </div>
  );
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
