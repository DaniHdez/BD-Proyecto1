export {
  getMontoRecaudadoCartago,
  getMontoRecaudadoHeredia,
  getMontoRecaudadoSanJose,
  getMontoRecaudadoTipoCartago,
  getMontoRecaudadoTipoHeredia,
  getMontoRecaudadoTipoSanJose,
  getTopClienteCartago,
  getTopClienteHeredia,
  getTopClienteSanJose
};
//###############################
//CARTAGO
//###############################
const CedJuridicaC = 378659898;
const CedJuridicaH = 384612874;
const CedJuridicaSJ = 377768778;

function getMontoRecaudadoCartago(fechaInicial, fechaFinal, CedJuridicaC) {}

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
