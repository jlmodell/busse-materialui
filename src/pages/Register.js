import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";

const api = "https://busse-nestjs-api.herokuapp.com";

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

const Register = withRouter(props => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: state.email,
      password: state.password
    };
    
    axios
      .post(`${api}/users/register`, {
        ...user
      })
      .then(res => {
        if (res.status === 201) {
          alert("Registered. Please Login.") 
          props.history.push("/login")
        } 
      })
      .catch(err => alert("Email exists."));

    
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h2">
        Register
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
              onChange={e => setState({...state, email: e.target.value})}
            />
          </FormControl>
        </div>
        <div className="form-control">
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              className={classes.input}
              type="password"
              id="password"
              value={state.password}
              onChange={e => setState({...state, password: e.target.value})}
            />
          </FormControl>
          </div>
        
        <div className={classes.buttonContainer}>
          <Button type="submit" className={classes.button}>
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
)(Register);
