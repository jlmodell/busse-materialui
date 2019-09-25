import React from "react";
import { observer } from "mobx-react";
import { Router } from "@reach/router";

import Layout from "./components/Layout";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Home from "./pages/Home";

//rewritten using MobX state manager
import ItemReviewMobx from "./testing/ItemReview_MobX";
import LoginMobX from "./testing/Login_MobX";
import SalesMobX from "./testing/Sales_MobX";
import ItemsMobX from "./testing/Items_MobX";
import IndividualByCustomerMobX from "./testing/IndivBySales_MobX";
import IndividualByItemMobX from "./testing/IndivByItem_MobX";

const PublicRoutes = () => (
  <Router>
    <Home path="/" />
    <LoginMobX path="/login" />
  </Router>
);

const PrivateRoutes = () => (
  <Router>
    <SalesMobX path="/sales" />
    <ItemsMobX path="/items" />
    <ItemReviewMobx path="/itemreview" />
    <IndividualByItemMobX path="/indivbyitem" />
    <IndividualByCustomerMobX path="/indivbycust" />
  </Router>
);

const App = observer(() => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Layout>
        <PublicRoutes />
        <PrivateRoutes />
      </Layout>
    </MuiPickersUtilsProvider>
  );
});

export default App;
