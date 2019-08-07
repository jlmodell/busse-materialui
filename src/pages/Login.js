import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// useSelector,
import { LOGIN } from "../store/reducers/authReducer";

const api = "https://busse-nestjs-api.herokuapp.com";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  // const auth = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    let creds = {
      email: state.email,
      password: state.password
    };

    console.log(creds);

    axios
      .post(`${api}/users/login`, creds)
      .then(res => {
        if (res.status === 201) {
          let payload = res.data.token;
          localStorage.setItem("auth", res.data.token);
          dispatch({ type: LOGIN, payload });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          email
          <input
            type="email"
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={state.password}
            onChange={e => setState({ ...state, password: e.target.value })}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}
