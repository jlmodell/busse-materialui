import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Layout from "./components/Layout";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Items from "./pages/Items";
import Prices from "./pages/Prices";

import { connect } from "react-redux";

const App = ({ state }) => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.user.token ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );

  const VisitorRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.user.token ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <VisitorRoute path='/login' exact component={Login} />
          <VisitorRoute path='/register' exact component={Register} />
          <PrivateRoute path='/items' exact component={Items} />
          <PrivateRoute path='/sales' exact component={Sales} />
          <PrivateRoute path='/prices' exact component={Prices} />
        </Switch>
      </Layout>
    </Router>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(App);
