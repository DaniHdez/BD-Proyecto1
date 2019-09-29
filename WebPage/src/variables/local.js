//Obtener monto recaudado para la sucursal actual
const montoRecaudado = "$1000";
const admin = "Santiago Gamboa";
const horario = "Lunes de 9am-11pm";
const ubicacion = "Provincia";
const Clients = [];
const month = [
  {
    value: "Ene",
    label: "Enero"
  },
  {
    value: "Feb",
    label: "Febrero"
  },
  {
    value: "Mar",
    label: "Marzo"
  },
  {
    value: "Abr",
    label: "Abril"
  },
  {
    value: "May",
    label: "Mayo"
  },
  {
    value: "Jun",
    label: "Junio"
  },
  {
    value: "Jul",
    label: "Julio"
  },
  {
    value: "Ago",
    label: "Agosto"
  },
  {
    value: "Sept",
    label: "Septiembre"
  },
  {
    value: "Oct",
    label: "Octubre"
  },
  {
    value: "Nov",
    label: "Noviembre"
  },
  {
    value: "Dec",
    label: "Diciembre"
  }
];

const orderType = [
  { value: "esp", label: "Especial" },
  { value: "reg", label: "Regular" }
];
module.exports = {
  montoRecaudado,
  admin,
  horario,
  ubicacion,
  Clients,
  month,
  orderType
};
