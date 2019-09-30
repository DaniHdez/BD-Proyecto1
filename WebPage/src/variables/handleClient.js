export {create_client, get_clients}

function create_client
(
    name,
    lastname1,
    lastname2,
    id,
   // accountNumber,
    phone,
    province
)
{
  var xhr = new window.XMLHttpRequest()
  var request_response;
  var success;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        request_response = JSON.parse(this.responseText);
        console.log("Request Response 2");
        console.log(request_response.Succes);
        var register  = request_response.Succes;
        if(register == "True")
        {
            alert('Registro Correcto')
        }
        else{
            alert('No se pudo realizar la operación\n')
        }
    }
    else{
        alert('No se pudo realizar la conexión\n')   
    }
  };

  xhr.open('POST', 'http://localhost:8080/Usuarios/POSTCliente', false )
  let values = { 
    Cedula:id,
    Nombre: name, 
    Apellido1:lastname1,
    Apellido2:lastname2, 
    Telefono:phone,
    Tipo: 3,
    Provincia:province
  };
  
  var to_send_json = JSON.stringify(values);
  console.log("JSON to send:")
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json)
}

function get_clients ( )
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
           return 
        }
        else{
            alert('No se pudo realizar la operación\n')
        }
    }
    else{
        alert('No se pudo realizar la conexión\n')   
    }
  };

  xhr.open('POST', 'http://localhost:8080/Usuarios/POSTCliente', false )
  
  console.log("JSON to send:")
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send()
}

