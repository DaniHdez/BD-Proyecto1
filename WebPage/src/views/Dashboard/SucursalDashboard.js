import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { montoRecaudado, admin, horario, ubicacion } from "variables/local";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SucursalDashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h3 className={classes.cardTitle} class="cardClient">
                Información general
              </h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={6} md={5}>
                  <Card>
                    <CardBody>
                      <h4>Monto recaudado:</h4>
                      <h3 class="cardBodyClient">{montoRecaudado}</h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <Card>
                    <CardBody>
                      <h4>Administrador:</h4>
                      <h3 class="cardBodyClient">{admin}</h3>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={5}>
                  <Card>
                    <CardBody>
                      <h4>Horario:</h4>
                      <h3 class="cardBodyClient">{horario}</h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <Card>
                    <CardBody>
                      <h4>Ubicación:</h4>
                      <h3 class="cardBodyClient">{ubicacion}</h3>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
