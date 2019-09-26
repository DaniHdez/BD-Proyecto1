// ##############################
// // // variables used to create animation on charts
// #############################
var delays2 = 100,
  durations2 = 1000;

// ##############################
// // // Monto recaudado Sucursal
// #############################
//Falta traerlo de la base de datos
const mrSJ = 1000;
const mrC = 500;
const mrH = 6000;
//Talvez una funcin para definir el punto mas bajo y mas alto apartir de los valores obtenidos de la api

const montoRecaudadoSucursalChart = {
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
// #############################
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

module.exports = {
  montoRecaudadoSucursalChart,
  montoRecaudadoTipoChart,
  clientesSucursalChart
};
