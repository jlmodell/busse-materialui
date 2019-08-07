import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";

import { Home, Items, Login, Prices, Sales } from "./pages";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/items' component={Items} />
          <Route path='/sales' component={Sales} />
          <Route path='/prices' component={Prices} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
