// ##############################
// // // variables used to create animation on charts
// #############################
var delays2 = 100,
  durations2 = 1000;

// ##############################
// // // Monto recaudado Sucursal
// #############################
//Falta traerlo de la base de datos
var mrSJ = 1000;
var mrC = 500;
var mrH = 6000;
//Talvez una funcin para definir el punto mas bajo y mas alto apartir de los valores obtenidos de la api

var montoRecaudadoSucursalChart = {
  data: {
    labels: ["San José", "Cartago", "Heredia"],
    series: [[mrSJ, mrC, mrH]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 400,
    high: 10000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};





// ##############################
// // // Monto recaudado Tipo
// ####################################################################################################################
//Falta traerlo de la base de datos
const mrR = 1000;
const mrE = 500;
//Talvez una funcin para definir el punto mas bajo y mas alto apartir de los valores obtenidos de la api

const montoRecaudadoTipoChart = {
  data: {
    labels: ["Regular", "Especial"],
    series: [[mrR, mrE]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 400,
    high: 5000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Clientes por sucursal
// #############################
//Falta traerlo de la base de datos
const clientesSJ = 100;
const clientesC = 54;
const clientesH = 160;

//Talvez una funcin para definir el punto mas bajo y mas alto apartir de los valores obtenidos de la api

const clientesSucursalChart = {
  data: {
    labels: ["San José", "Cartago", "Heredia"],
    series: [[clientesSJ, clientesH, clientesC]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 500,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

var exported = module.exports = {
  montoRecaudadoSucursalChart,
  montoRecaudadoTipoChart,
  clientesSucursalChart
};


exported.GETRecaudadoPorSucursal_todas = function () { //Falta comprobar que el SP sirve
  // code to be executed
//request_response;
var CedJuridica1 = 384612874;
var CedJuridica2 = 378659898;
var CedJuridica3 = 377768778;
//var recaudation = 0;

var xhr = new window.XMLHttpRequest()
var request_response;
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("request_response_recaudation");
      console.log(request_response);
      montoRecaudadoSucursalChart.data.series[0][0] = parseFloat(request_response.Result1.recordset[0]["TotalRecaudado"])
      montoRecaudadoSucursalChart.data.series[0][1] = parseFloat(request_response.Result2.recordset[0]["TotalRecaudado"])
      montoRecaudadoSucursalChart.data.series[0][2] = parseFloat(request_response.Result3.recordset[0]["TotalRecaudado"])
      console.log("Totales Recaudados");
      console.log(request_response.Result1.recordset[0]["TotalRecaudado"])
      console.log(request_response.Result2.recordset[0]["TotalRecaudado"])
      console.log(request_response.Result3.recordset[0]["TotalRecaudado"])
  }
};


xhr.open('POST', 'http://localhost:8080/Sucursal/GetDineroRecaudadoEnSucursal_Todas', false)
let values = { 
  CedJuridica1: CedJuridica1,
  CedJuridica2: CedJuridica2,
  CedJuridica3: CedJuridica3
};

var to_send_json = JSON.stringify(values);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(to_send_json)


return montoRecaudadoSucursalChart.data;

}


exported.GETRecaudadoParaTipoDePedido_ambos = function () { //Falta comprobar que el SP sirve
  // code to be executed
//request_response;
var CedJuridica1 = 384612874;
var CedJuridica2 = 378659898;
var CedJuridica3 = 377768778;
//var recaudation = 0;

var xhr = new window.XMLHttpRequest()
var request_response;
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      request_response = JSON.parse(this.responseText);
      console.log("request_response_recaudation_types");
      console.log(request_response);
      try{
      montoRecaudadoTipoChart.data.series[0][0] = parseFloat(request_response.Result1.recordset[0]["Monto"]);
      }catch{
        montoRecaudadoTipoChart.data.series[0][0] = 0;
      }
      try{
        montoRecaudadoTipoChart.data.series[0][1] = parseFloat(request_response.Result2.recordset[0]["Monto"]);
      }catch{
        montoRecaudadoTipoChart.data.series[0][1] = 0;
      }
      //montoRecaudadoTipoChart.data.series[0][2] = parseFloat(request_response.Result3.recordset[0]["TotalRecaudado"])
      
      //console.log(request_response.Result3.recordset[0]["TotalRecaudado"])
  }
};


xhr.open('POST', 'http://localhost:8080/Montos/GetMontoParaTipoDePedido_ambos', false)
let values = { 
  FechaInicial: "01/01/98 23:59:59",
  FechaFinal: "01/01/25 23:59:59",
  Tipo1: 1,
  Tipo2: 2
};

var to_send_json = JSON.stringify(values);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(to_send_json)


return montoRecaudadoTipoChart.data;

}

