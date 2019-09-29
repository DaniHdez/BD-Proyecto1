/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import SignIn from "views/SignIn/SignIn.js";
import Client from "layouts/Client.js";
import Employee from "layouts/Employee.js";
import Local from "layouts/Local.js";
import Register from "views/Register/Register.js";

// import Sucursal from "layouts/Sucursal.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/signin" component={SignIn} />
      <Route path="/client" component={Client} />
      <Route path="/employee" component={Employee} />
      <Route path="/local" component={Local} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
