export {get_all_pedidos}


function get_all_pedidos( Orders)
{
    var xhr = new window.XMLHttpRequest()
  var request_response;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        request_response = JSON.parse(this.responseText);
        console.log("Request Response 2");
        console.log(request_response.Succes);
        var query  = request_response.Succes;
        if(query == "True")
        { 
            var json_Orders = request_response.Result;
            for (var i = 0; i <json_Orders.length; i++){
                var tipo = "Regular";
                if(json_Orders[i].Tipo == 1){ tipo = "Especial"}
                var estado = "Entregado";
                if(json_Orders[i].Estado == 1){ estado = "En Espera"}
                
                    
                let tempOrder = {
                    // "farmacia"
                    // "client" 
                    // "date"
                    // "type"
                    // "state"
                    // "datail"
                    //  Farmacia": "La Fischel",
                    // "Cliente": "Ricardo",
                    // "Apellido1": "Jiménez",
                    // "Apellido2": "Muñoz",
                    // "Fecha": "2019-07-01T00:00:00.000Z",
                    // "Tipo": 1,
                    // "Estado"
                    farmacia:  json_Orders[i].Farmacia,
                    client: json_Orders[i].Cliente + " " + json_Orders[i].Apellido1,
                    date: json_Orders[i].Fecha,
                    type: tipo,
                    state: estado,
                    code: json_Orders[i].Codigo
                }
                Orders.push(tempOrder)
            }
        }
    }
};

  try {
        xhr.open('GET', 'http://localhost:8080/pedidos/all', false )
        xhr.setRequestHeader("Content-Type", "application/json")    
        xhr.send()
   
  } catch (error) {
    alert(error)  
  }
}