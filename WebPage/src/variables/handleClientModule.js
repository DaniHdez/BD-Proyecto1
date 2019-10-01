export { getPedidosCliente };

function getPedidosCliente(Cedula) {
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
    CedJuridica: Cedula
  };
  var to_send_json = JSON.stringify(values);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json);
}
