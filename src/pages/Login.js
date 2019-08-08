import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { login, userEmail, userPassword } from "../store/actions";

const api = "https://busse-nestjs-api.herokuapp.com";

const Login = withRouter(props => {
  const user = {
    email: props.state.user.email,
    password: props.state.user.password
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${api}/users/login`, {
        ...user
      })
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem("auth", res.data.token);
          props.login(res.data.token);
          props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email
          <input
            type="email"
            value={props.state.email}
            onChange={e => props.userEmail(e.target.value)}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={props.state.password}
            onChange={e => props.userPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
});

const mapStateToProps = state => {
  console.log(state);
  return { state };
};

export default connect(
  mapStateToProps,
  { login, userEmail, userPassword }
)(Login);
