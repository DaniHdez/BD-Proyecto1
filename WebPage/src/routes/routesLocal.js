// @material-ui/icons
import Order from "@material-ui/icons/LibraryBooks";
import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
// core components/views for Client layout
import SucursalOrder from "views/Orders/SucursalOrder.js";
import SucursalDashboard from "views/Dashboard/SucursalDashboard";
import Clients from "views/Clients/SucursalClient";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Pagina principal",
    icon: Dashboard,
    component: SucursalDashboard,
    layout: "/local"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: Order,
    component: SucursalOrder,
    layout: "/local"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: People,
    component: Clients,
    layout: "/local"
  }
];

export default dashboardRoutes;
