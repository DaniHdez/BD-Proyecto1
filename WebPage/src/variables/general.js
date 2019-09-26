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

module.exports = {
  tipoSJ,
  tipoH,
  tipoC,
  topClient,
  topClientC,
  topClientH,
  topClientSJ
};
