// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Order from "@material-ui/icons/LibraryBooks";
// core components/views for Client layout
import ClientDashboard from "views/Dashboard/ClientDashboard.js";
import ClientOrder from "views/Orders/ClientsOrders.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Página principal",
    icon: Dashboard,
    component: ClientDashboard,
    layout: "/client"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: Order,
    component: ClientOrder,
    layout: "/client"
  }
];

export default dashboardRoutes;
