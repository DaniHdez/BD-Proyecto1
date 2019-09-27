// ##############################
// // // Data for Dashboard
// #############################

//Falta traer datos de base de datos de cantidad recaudado por sucursal por tipo
const pedidosSJ = 17;
const pedidosEspecialesSJ = 17;
const pedidosC = 17;
const pedidosEspecialesC = 17;
const pedidosH = 17;
const pedidosEspecialesH = 17;

//Traer los tres mejores clientes generales
const clientOneName = "Pablo";
const clientOneType = "Oro";
const clientOnePharmacy = "SJ";

//Traer los mejores clientes por sucursal
const clientSJName = "Jesus";
const clientSJType = "Oro";
const noPedidosSJ = 16;
const clientCName = "Jesus";
const clientCType = "Oro";
const noPedidosC = 16;
const clientHName = "Jesus";
const clientHType = "Oro";
const noPedidosH = 16;

var topClient = [
  [clientOneName, clientOneType, clientOnePharmacy],
  [clientOneName, clientOneType, clientOnePharmacy],
  [clientOneName, clientOneType, clientOnePharmacy]
];

var topClientSJ = [
  [clientSJName, clientSJType, noPedidosSJ],
  [clientSJName, clientSJType, noPedidosSJ],
  [clientSJName, clientSJType, noPedidosSJ]
];

var topClientC = [
  [clientCName, clientCType, noPedidosC],
  [clientCName, clientCType, noPedidosC],
  [clientCName, clientCType, noPedidosC]
];

var topClientH = [
  [clientHName, clientHType, noPedidosH],
  [clientHName, clientHType, noPedidosH],
  [clientHName, clientHType, noPedidosH]
];

var tipoSJ = [
  ["Pedidos regulares:", pedidosSJ],
  ["Pedidos especiales:", pedidosEspecialesSJ]
];
var tipoH = [
  ["Pedidos regulares:", pedidosC],
  ["Pedidos especiales:", pedidosEspecialesC]
];
var tipoC = [
  ["Pedidos regulares:", pedidosH],
  ["Pedidos especiales:", pedidosEspecialesH]
];

// #########################################
// // // Data for Medicine, Clients, Orders
// #########################################
//Ejemplo menu item
const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

var Medicines = [];
var Orders = [];
var Clients = [];
//Se deben traer los clientes de la base
//El value se puede definir con un contador dependiendo de la cantidad de clientes en la tabla
const clientsH = [
  { value: "client1", label: "Luis" },
  { value: "client2", label: "Luis" },
  { value: "client3", label: "Luis" }
];
const orderState = [
  { value: "listo", label: "Listo para entregar" },
  { value: "entregado", label: "Entregado" }
];

const orderType = [
  { value: "especia;", label: "Especial" },
  { value: "regular", label: "Regular" }
];

const medicines = [
  { value: "especia;", label: "Especial" },
  { value: "regular", label: "Regular" }
];

module.exports = {
  tipoSJ,
  tipoH,
  tipoC,
  topClient,
  topClientC,
  topClientH,
  topClientSJ,
  Medicines,
  Orders,
  Clients,
  currencies,
  clientsH,
  orderState,
  orderType,
  medicines
};
