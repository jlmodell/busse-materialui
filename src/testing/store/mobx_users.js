import { observable } from "mobx";
import axios from "axios";

const _url = "https://busse-nestjs-api.herokuapp.com/users/login";

export const users = observable({
  email: "",
  password: "",
  error: "",
  setEmail(email) {
    users.email = email;
  },
  setPassword(password) {
    users.password = password;
  },
  onClear() {
    users.email = "";
    users.password = "";
  },
  token: localStorage.getItem("token") || null,
  createdAt: localStorage.getItem("createdAt") || null,
  expiresAt: localStorage.getItem("expiresAt") || null,
  login() {
    axios
      .post(`${_url}`, {
        email: users.email,
        password: users.password
      })
      .then(res => {
        users.error = "";
        localStorage.clear();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expiresAt", res.data.expiresAt);
        localStorage.setItem("createdAt", res.data.createdAt);
        users.token = res.data.token;
        users.createdAt = res.data.createdAt;
        users.expiresAt = res.data.expiresAt;
      })
      .catch(err => {
        users.error = `${err}`;
      });
  },
  logout() {
    localStorage.clear();
    users.token = localStorage.getItem("token") || null;
    users.createdAt = localStorage.getItem("createdAt") || null;
    users.expiresAt = localStorage.getItem("expiresAt") || null;
  },
  showPassword: false,
  setShowPassword() {
    users.showPassword = !users.showPassword;
  }
});
