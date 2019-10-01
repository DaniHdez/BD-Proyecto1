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
  mr
};
//###############################
//CARTAGO
//###############################
const CedJuridicaC = 378659898;
const CedJuridicaH = 384612874;
const CedJuridicaSJ = 377768778;
var mr = 0;

function getMontoRecaudadoCartago(FechaInicial, FechaFinal) {
  var xhr = new window.XMLHttpRequest();
  var request_response;
  //var monto = 0;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("Request Response 2");
      console.log(request_response.Succes);
      var query = request_response.Succes;
      if (query == "True") {
        mr = request_response.Result;
        console.log(mr);
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

  //return mr;
}

function getMontoRecaudadoTipoCartago(
  fechaInicial,
  fechaFinal,
  Tipo,
  CedJuridica
) {}

function getTopClienteCartago(fechaInicial, fechaFinal) {}

//###############################
//San Jose
//###############################
function getMontoRecaudadoSanJose(fechaInicial, fechaFinal, CedJuridicaSJ) {}

function getMontoRecaudadoTipoSanJose(
  fechaInicial,
  fechaFinal,
  Tipo,
  CedJuridica
) {}

function getTopClienteSanJose(fechaInicial, fechaFinal) {}

//###############################
//Heredia
//###############################

function getMontoRecaudadoHeredia(fechaInicial, fechaFinal, CedJuridicaH) {}

function getMontoRecaudadoTipoHeredia(
  fechaInicial,
  fechaFinal,
  Tipo,
  CedJuridica
) {}

function getTopClienteHeredia(fechaInicial, fechaFinal) {}
