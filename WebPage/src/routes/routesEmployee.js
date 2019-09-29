// @material-ui/icons
import Order from "@material-ui/icons/LibraryBooks";
// core components/views for Client layout
import Orders from "views/Orders/Orders.js";

const dashboardRoutes = [
  {
    path: "/pedidos",
    name: "Registro de pedidos",
    icon: Order,
    component: Orders,
    layout: "/employee"
  }
];

export default dashboardRoutes;
