// ##############################
// // // Data for Dashboard
// #############################

//Falta traer datos de base de datos de cantidad recaudado por sucursal por tipo
var pedidosSJ = 17;
var pedidosEspecialesSJ = 17;
var pedidosC = 17;
var pedidosEspecialesC = 17;
var pedidosH = 17;
var pedidosEspecialesH = 17;

//Traer los tres mejores clientes generales
var clientOneName = "Pablo2"
var clientOneType = "Oro";
var clientOnePharmacy = "SJ";

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
//Ejemplo formato
var Medicines = [
  {
    name: "Aspirina",
    brand: "Bayern",
    type: "Analgesico",
    photo: "Aca va la foto",
    price: "$3",
    quantity: "6"
  },
  {
    name: "Cataflam",
    brand: "Bayern",
    type: "Analgesico",
    photo: "Aca va la foto",
    price: "$3",
    quantity: "6"
  }
];

var Orders = [];
var Clients = [];
var Employee = [];
var AdminSucursal = [];
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

var exported = module.exports = {
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
  medicines,
  Employee,
  AdminSucursal
};

exported.GetTopClientes = function () { //FUcking READY
  // code to be executed
//request_response;
var xhr = new window.XMLHttpRequest()
var request_response;
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      //request_response = JSON.parse(this.responseText);
      request_response = JSON.parse(this.responseText);
      //Nombre,tipo,farmacia
      try{
      topClient[0][0] = request_response.Result.recordset[0]["Nombre"];
      topClient[0][1] = request_response.Result.recordset[0]["tipo"];
      topClient[0][2] = "Central";
      }
      catch{
        topClient[0][0] = "N/A";
        topClient[0][1] = "N/A";
        topClient[0][2] = "N/A";
        topClient[1][0] = "N/A";
        topClient[1][1] = "N/A";
        topClient[1][2] = "N/A";
        topClient[2][0] = "N/A";
        topClient[2][1] = "N/A";
        topClient[2][2] = "N/A";

      }
      try{
      topClient[1][0] = request_response.Result.recordset[1]["Nombre"];
      topClient[1][1] = request_response.Result.recordset[1]["tipo"];
      topClient[1][2] = "Central";
      }catch{
        topClient[1][0] = "N/A";
        topClient[1][1] = "N/A";
        topClient[1][2] = "N/A";
        topClient[2][0] = "N/A";
        topClient[2][1] = "N/A";
        topClient[2][2] = "N/A";
      }
      try{
      topClient[2][0] = request_response.Result.recordset[2]["Nombre"];
      topClient[2][1] = request_response.Result.recordset[2]["tipo"];
      topClient[2][2] = "Central";
      }catch{
        topClient[2][0] = "N/A";
        topClient[2][1] = "N/A";
        topClient[2][2] = "N/A";
      }
  }
};
let FechaInicial= "01/01/98 23:59:59";
let FechaFinal= "01/01/25 23:59:59";

xhr.open('POST', 'http://localhost:8080/Clientes/GETTopClientes', false)
let values = { 
  FechaInicial: FechaInicial, 
  FechaFinal:FechaFinal 
};

var to_send_json = JSON.stringify(values);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(to_send_json)

return topClient;

}


exported.GETMontoParaTipoDePedido_SJ = function () { //Falta comprobar que el SP sirve
  // code to be executed
//request_response;

var xhr = new window.XMLHttpRequest()
var request_response;
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("request_response_Trying_HARD");
      console.log(request_response);
  }
};


xhr.open('POST', 'http://localhost:8080/Montos/MontoRecaudadoPorSucursal', false)
let values = { 
  CedJuridica: 384612874,
  Tipo1: 1,
  Tipo2: 2
};

var to_send_json = JSON.stringify(values);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(to_send_json)


return tipoSJ;

}

exported.GETRecaudadoPorSucursal = function () { //Falta comprobar que el SP sirve
  // code to be executed
//request_response;
var CedJuridica = 384612874;
var recaudation = 0;

var xhr = new window.XMLHttpRequest()
var request_response;
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("request_response_recaudation");
      console.log(request_response);
  }
};


xhr.open('POST', 'http://localhost:8080/Sucursal/GetDineroRecaudadoEnSucursal', false)
let values = { 
  CedJuridica: CedJuridica
};

var to_send_json = JSON.stringify(values);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(to_send_json)


return recaudation;

}

