import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Layout from "./components/Layout";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Items from "./pages/Items";
import Prices from "./pages/Prices";
import IndividualByCustomer from "./pages/IndividualByCustomer";
import IndividualByItem from "./pages/IndividualByItem";
import SingleAnalysis from "./pages/SingleAnalysis";
import Chart from "./pages/Chart";

import { logout } from "./store/actions";

import { connect } from "react-redux";

const App = ({ state, logout }) => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.user.token &&
        new Date(state.user.tokenDetails.expiresAt) > new Date() ? (
          <Component {...props} />
        ) : (
          logout() && <Redirect to="/login" />
        )
      }
    />
  );

  const VisitorRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.user.token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <VisitorRoute path="/login" exact component={Login} />
            <VisitorRoute path="/register" exact component={Register} />
            <PrivateRoute path="/items" exact component={Items} />
            <PrivateRoute path="/sales" exact component={Sales} />
            <PrivateRoute path="/prices" exact component={Prices} />
            <PrivateRoute path="/single" exact component={SingleAnalysis} />
            <PrivateRoute path="/chart/:name/:id" component={Chart} />
            <PrivateRoute
              path="/indivbycust"
              exact
              component={IndividualByCustomer}
            />
            <PrivateRoute
              path="/indivbyitem"
              exact
              component={IndividualByItem}
            />
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

export default connect(
  mapStateToProps,
  { logout }
)(App);
