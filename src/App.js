import React from "react";
import { observer } from "mobx-react";
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
// import Sales from "./pages/Sales";
// import Items from "./pages/Items";
import Prices from "./pages/Prices";
// import IndividualByCustomer from "./pages/IndividualByCustomer";
// import IndividualByItem from "./pages/IndividualByItem";
import SingleAnalysis from "./pages/SingleAnalysis";
import Chart from "./pages/Chart";

//testing
import mobx from "./testing/mobx";
import Login_MobX from "./testing/Login_MobX";
import Sales_MobX from "./testing/Sales_MobX";
import Items_MobX from "./testing/Items_MobX";
import IndividualByCustomer_MobX from "./testing/IndivBySales_MobX";
import IndividualByItem_MobX from "./testing/IndivByItem_MobX";

import { logout } from "./store/actions";

import { connect } from "react-redux";
import { sales } from "./testing/store/mobx_sales";

const App = observer(({ state, logout }) => {
  const store = sales;

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

  const IndividualizedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.user.token &&
        new Date(state.user.tokenDetails.expiresAt) > new Date() ? (
          store.individualSales || store.individualItems ? (
            <Component {...props} />
          ) : (
            <Redirect to="/sales" />
          )
        ) : (
          logout() && <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/testing" component={mobx} />
            <VisitorRoute path="/login" exact component={Login_MobX} />
            <VisitorRoute path="/register" exact component={Register} />
            <PrivateRoute path="/items" exact component={Items_MobX} />
            <PrivateRoute path="/sales" exact component={Sales_MobX} />
            <PrivateRoute path="/prices" exact component={Prices} />
            <PrivateRoute path="/single" exact component={SingleAnalysis} />
            <PrivateRoute path="/chart/:name/:id" component={Chart} />
            <IndividualizedRoute
              path="/indivbycust"
              exact
              component={IndividualByCustomer_MobX}
            />
            <IndividualizedRoute
              path="/indivbyitem"
              exact
              component={IndividualByItem_MobX}
            />
          </Switch>
        </Layout>
      </Router>
    </MuiPickersUtilsProvider>
  );
});

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(App);
