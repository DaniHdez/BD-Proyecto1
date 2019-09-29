// @material-ui/icons
import Order from "@material-ui/icons/LibraryBooks";
import People from "@material-ui/icons/People";
// core components/views for Client layout
import Orders from "views/Orders/Orders.js";
import Clients from "views/Clients/Clients.js";

const dashboardRoutes = [
  {
    path: "/pedidos",
    name: "Registro de pedidos",
    icon: Order,
    component: Orders,
    layout: "/employee"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: People,
    component: Clients,
    layout: "/employee"
  }
];

export default dashboardRoutes;
