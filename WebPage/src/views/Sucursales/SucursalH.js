import React from "react";
import "date-fns";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Table from "components/Table/Table.js";

import { topClientH } from "variables/general.js";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  textField: { margin: theme.spacing(1) }
}));

export default function Sucursal() {
  const classes = useStyles();

  function handleMRFilter() {
    var fechainicial = document.getElementById("inidateMR").value;
    var fechainicial = document.getElementById("findateMR").value;
    //###################################
    //obtener datos de DB en esas fechas
    //###################################
  }
  function handleMRTFilter() {
    var fechainicial = document.getElementById("inidateMRT").value;
    var fechainicial = document.getElementById("findateMRT").value;
    //###################################
    //obtener datos de DB en esas fechas
    //###################################
  }
  function handleTCFilter() {
    var fechainicial = document.getElementById("inidateTC").value;
    var fechainicial = document.getElementById("findateTC").value;
    //###################################
    //obtener datos de DB en esas fechas
    //###################################
  }

  //Funcin para obtener el valor de la fecha indicada
  const mr = "$1000";
  const mrtr = "$1000";
  const mrte = "$1000";
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="warning">
            <div class="fab">
              <TextField
                variant="outlined"
                margin="normal"
                id="inidateMR"
                label="Fecha de inicio"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
                type="date"
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="findateMR"
                label="Fecha final"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
                type="date"
              />
              <Button className={classes.button} onClick={handleMRFilter}>
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Monto recaudado:</h4>
            <h1 className={classes.CardCategory}> {mr} </h1>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="success">
            <div class="fab">
              <TextField
                variant="outlined"
                margin="normal"
                id="inidateMRT"
                label="Fecha de inicio"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="findateMRT"
                label="Fecha final"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <Button className={classes.button} onClick={handleMRTFilter}>
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Monto recaudado por tipo:</h4>
            <h2 className={classes.CardCategory}> Pedido regular {mrtr} </h2>
            <h2 className={classes.CardCategory}> Pedido especial {mrte} </h2>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div class="fab">
              <TextField
                variant="outlined"
                margin="normal"
                id="inidateTC"
                label="Fecha de inicio"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="findateTC"
                label="Fecha final"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <Button className={classes.button} onClick={handleTCFilter}>
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={["Nombre", "Categoria", "Total de pedidos"]}
              tableData={topClientH}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
