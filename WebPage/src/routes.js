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
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Pharmacy from "@material-ui/icons/LocalPharmacy";
import Persons from "@material-ui/icons/People";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import MedListTable from "views/Medicines/MedListTable.js";
import Sucursal from "views/Sucursales/Sucursal.js";
import Clients from "views/Clients/Clients.js";
import Orders from "views/Orders/Orders.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Página principal",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/sucursales",
    name: "Sucursales",
    icon: Pharmacy,
    component: Sucursal,
    layout: "/admin"
  },
  {
    path: "/medicamentos",
    name: "Medicamentos",
    icon: "content_paste",
    component: MedListTable,
    layout: "/admin"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: Persons,
    component: Clients,
    layout: "/admin"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: LibraryBooks,
    component: Orders,
    layout: "/admin"
  }
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
