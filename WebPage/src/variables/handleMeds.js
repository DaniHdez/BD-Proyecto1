export {get_meds}


function get_meds (Meds){
    var xhr = new window.XMLHttpRequest()
    var request_response;
    // var lista_clients = [];
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            request_response = JSON.parse(this.responseText);
            console.log("Request Response 2");
            console.log(request_response.Succes);
            var query  = request_response.Succes;
            if(query == "True")
            {  
                var json_clients = request_response.Result;
                for (var i = 0; i <json_clients.length; i++){
                    
                    Meds.push(request_response[i]);
                }

            }
        }
        console.log("Lista Clientes")
        console.log(Meds)
    }
    xhr.open('GET', 'http://localhost:8080/clientes/all', false )
  
    console.log("JSON to send:")
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send()
}