
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
            for (var i = 0; i <json_Meds.length; i++){
                let tempOrder = {
                    // "farmacia"
                    // "client" 
                    // "date"
                    // "type"
                    // "state"
                    // "datail"
                    farmacia:  json_Meds[i].farmacia,
                    client: json_Meds[i].Nombre + " " + json_Meds[i].Apellido,
                    date: json_Meds[i].Date,
                    type: json_Meds[i].Tipo,
                    state: json_Meds[i].State,
                    datail: json_Meds[i].Detail
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