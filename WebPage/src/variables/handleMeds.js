import { func } from "prop-types";

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
                var json_Meds = request_response.Result;
 
                // formato >> 
                // {name: "Aspirina",
                // brand: "Bayern",
                // type: "Analgesico",
                // photo: "Aca va la foto",
                // price: "$3",
                // quantity: "6"}
                for (var i = 0; i <json_Meds.length; i++){
                    let tempMed = {
                        name:  json_Meds[i].Nombre,
                        brand: json_Meds[i].Marca,
                        type: json_Meds[i].Tipo,
                        photo: 'N/A',
                        price: json_Meds[i].Precio,
                        quantity: json_Meds[i].Stock
                        //quantity: json_Meds[i].,
                    }
                    Meds.push(tempMed);
                }

            }
        }
        console.log("Lista Clientes")
        console.log(Meds)
    }
    xhr.open('GET', 'http://localhost:8080/medicamentos/all', false )
  
    console.log("JSON to send:")
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send()
}



function create_med (name, brand, descript, type, doseI, doseA, effects, price, stock )
{
    var xhr = new window.XMLHttpRequest()
    var request_response;
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
    
   

    // let Nombre = req.body["Nombre"];
    // let Descripcion = req.body["Descripcion"];
    // let DosisNinos = req.body["DosisNinos"];
    // let DosisAdultos = req.body["DosisAdultos"];
    // let EfectosSecundarios = req.body["EfectosSecundarios"];
    // let Foto = req.body["Foto"];
    // let Precio = req.body["Precio"];
    // let Tipo = req.body["Tipo"];
    // let IdMarca = req.body["IdMarca"];
    
  
  let values = { 
    Nombre:id,
    Descripcion: name, 
    DosisNinos:lastname1,
    DosisAdultos:lastname2, 
    EfectosSecundarios:phone,
    Foto: 3,
    Provincia:province
  };
  var to_send_json = JSON.stringify(values);
  xhr.open('POST', 'http://localhost:8080/Medicamentos/POSTMedicamento', false )
  console.log("JSON to send:")
  console.log(to_send_json);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(to_send_json)

}