import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { register, userEmail, userPassword } from "../store/actions";

const api = "https://busse-nestjs-api.herokuapp.com";

const Register = withRouter(props => {
  console.log(props);
  const user = {
    email: props.state.user.email,
    password: props.state.user.password
  };

  const handleSubmit = e => {
    e.preventDefault();

    let success = "Successfully Registered. Please Log In";
    let failure = "Email already exists.";

    axios
      .post(`${api}/users/register`, {
        ...user
      })
      .then(res => {
        res.status === 201 && props.register() && alert(success);
      })
      .then(props.history.push("/login"))
      .catch(err => alert(failure, err));
  };

  return (
    <div>
      <h1>Register a new User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email
          <input
            type="email"
            value={props.state.user.email}
            onChange={e => props.userEmail(e.target.value)}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={props.state.user.password}
            onChange={e => props.userPassword(e.target.value)}
          />
        </label>
        <button>Register</button>
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
  { register, userEmail, userPassword }
)(Register);
