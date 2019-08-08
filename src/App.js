import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Items from "./pages/Items";
import Prices from "./pages/Prices";

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/items' exact component={Items} />
          <Route path='/sales' exact component={Sales} />
          <Route path='/prices' exact component={Prices} />
        </Switch>
      </Layout>
    </Router>
  );
}
