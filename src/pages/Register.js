import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const api = "https://busse-nestjs-api.herokuapp.com";

export default withRouter(({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    console.log(state.email, state.password);

    let body = {
      email: state.email,
      password: state.password
    };

    axios
      .post(`${api}/users/register`, {
        ...body
      })
      .then(res => {
        console.log(res);
        res.status === 201 && history.push("/login");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Register a new User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email
          <input
            type='email'
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
          />
        </label>
        <label>
          password
          <input
            type='password'
            value={state.password}
            onChange={e => setState({ ...state, password: e.target.value })}
          />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
});
