export {
  getMontoRecaudadoCartago,
  getMontoRecaudadoHeredia,
  getMontoRecaudadoSanJose,
  getMontoRecaudadoTipoCartago,
  getMontoRecaudadoTipoHeredia,
  getMontoRecaudadoTipoSanJose,
  getTopClienteCartago,
  getTopClienteHeredia,
  getTopClienteSanJose,
  mrC,
  mrSJ,
  mrH,
  mrTC,
  mrTSJ,
  mrTH,
  topClientC,
  topClientH,
  topClientSJ
};
//###############################
//CARTAGO
//###############################
const CedJuridicaC = 378659898;
const CedJuridicaH = 384612874;
const CedJuridicaSJ = 377768778;
var mrC = 0;
var mrSJ = 0;
var mrH = 0;
var mrTC = 0;
var mrTSJ = 0;
var mrTH = 0;
var topClientC = [];
var topClientSJ = [];
var topClientH = [];

function getMontoRecaudadoCartago(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrC = request_response.Result;
        console.log(mrC);
      }
    }
  };

  xhr.open("POST", "http://localhost:8080/monto/montosucursalrango", false);
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaC
  };
  var to_send_json = JSON.stringify(values);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getMontoRecaudadoTipoCartago(FechaInicial, FechaFinal, Tipo) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrTC = request_response.Result;
        console.log(mrTC);
      }
    }
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Monto/MontoXSucursalXTipoEnRango",
    false
  );
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaC,
    Tipo: Tipo
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getTopClienteCartago(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  // var lista_clients = [];
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        var json_clients = request_response.Result;
        for (var i = 0; i < json_clients.length; i++) {
          var tempClient = [];
          tempClient.push(json_clients[i].Nombre);
          console.log("NOMBREEE");
          console.log(json_clients[i].Nombre);
          tempClient.push(
            json_clients[i].Apellido1 + " " + json_clients[i].Apellido2
          );
          if (json_clients[i].Tipo == 1) {
            tempClient.push("Oro");
          } else if (json_clients[i].Tipo == 2) {
            tempClient.push("Plata");
          } else {
            tempClient.push("Bronce");
          }
          tempClient.push(json_clients[i].CantidadDePedidos);
          topClientC.push(tempClient);
        }
      }
    }
    console.log("Lista Clientes");
    console.log(topClientC);
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Clientes/GETTopClientesEnRango",
    false
  );

  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaC
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

//###############################
//San Jose
//###############################
function getMontoRecaudadoSanJose(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrSJ = request_response.Result;
        console.log(mrSJ);
      }
    }
  };

  xhr.open("POST", "http://localhost:8080/monto/montosucursalrango", false);
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaSJ
  };
  var to_send_json = JSON.stringify(values);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getMontoRecaudadoTipoSanJose(FechaInicial, FechaFinal, Tipo) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrTSJ = request_response.Result;
        console.log(mrTSJ);
      }
    }
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Monto/MontoXSucursalXTipoEnRango",
    false
  );
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaSJ,
    Tipo: Tipo
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getTopClienteSanJose(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  // var lista_clients = [];
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        var json_clients = request_response.Result;
        for (var i = 0; i < json_clients.length; i++) {
          var tempClient = [];
          tempClient.push(json_clients[i].Nombre);
          console.log("NOMBREEE");
          console.log(json_clients[i].Nombre);
          tempClient.push(
            json_clients[i].Apellido1 + " " + json_clients[i].Apellido2
          );
          if (json_clients[i].Tipo == 1) {
            tempClient.push("Oro");
          } else if (json_clients[i].Tipo == 2) {
            tempClient.push("Plata");
          } else {
            tempClient.push("Bronce");
          }
          tempClient.push(json_clients[i].CantidadDePedidos);
          topClientSJ.push(tempClient);
        }
      }
    }
    console.log("Lista Clientes");
    console.log(topClientSJ);
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Clientes/GETTopClientesEnRango",
    false
  );

  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaSJ
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

//###############################
//Heredia
//###############################

function getMontoRecaudadoHeredia(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrH = request_response.Result;
        console.log(mrH);
      }
    }
  };

  xhr.open("POST", "http://localhost:8080/monto/montosucursalrango", false);
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaH
  };
  console.log(CedJuridicaSJ);
  var to_send_json = JSON.stringify(values);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getMontoRecaudadoTipoHeredia(FechaInicial, FechaFinal, Tipo) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mrTH = request_response.Result;
        console.log(mrTH);
      }
    }
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Monto/MontoXSucursalXTipoEnRango",
    false
  );
  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaH,
    Tipo: Tipo
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}

function getTopClienteHeredia(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  // var lista_clients = [];
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        var json_clients = request_response.Result;
        for (var i = 0; i < json_clients.length; i++) {
          var tempClient = [];
          tempClient.push(json_clients[i].Nombre);
          console.log("NOMBREEE");
          console.log(json_clients[i].Nombre);
          tempClient.push(
            json_clients[i].Apellido1 + " " + json_clients[i].Apellido2
          );
          if (json_clients[i].Tipo == 1) {
            tempClient.push("Oro");
          } else if (json_clients[i].Tipo == 2) {
            tempClient.push("Plata");
          } else {
            tempClient.push("Bronce");
          }
          tempClient.push(json_clients[i].CantidadDePedidos);
          topClientH.push(tempClient);
        }
      }
    }
    console.log("Lista Clientes");
    console.log(topClientH);
  };

  xhr.open(
    "POST",
    "http://localhost:8080/Clientes/GETTopClientesEnRango",
    false
  );

  let values = {
    FechaInicial: FechaInicial,
    FechaFinal: FechaFinal,
    CedJuridica: CedJuridicaH
  };
  var to_send_json = JSON.stringify(values);
  console.log("To send");
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}
