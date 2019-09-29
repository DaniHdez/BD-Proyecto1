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
import { Name, totalOrders, range } from "variables/client.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ClientDashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>account_box</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Información del usuario</p>
              <h3 className={classes.cardTitle}>{Name}</h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitle} class="cardClient">
                        Información personal
                      </h4>
                    </CardHeader>
                    <CardBody>
                      {/**Get personal information from API */}
                      <h5>Número teléfono:</h5>
                      <h5>Provincia:</h5>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="success">
                      <h4 className={classes.cardTitle} class="cardClient">
                        Rango de cliente
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <h6>Cantidad total de pedidos:</h6>
                      <h3 class="cardBodyClient"> {totalOrders}</h3>
                      <h6>Rango:</h6>
                      <h3 class="cardBodyClient"> {range}</h3>
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
