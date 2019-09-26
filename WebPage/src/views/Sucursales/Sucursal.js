import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//Solo como ejemplo borrar
import Dashboard from "views/Dashboard/Dashboard.js";
//
import SucursalSJ from "views/Sucursales/SucursalSJ.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);
export default function Sucursal() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="info">
            <h4 className={classes.cardTitleWhite}>Información detallada</h4>
          </CardHeader>
          <CardBody>
            <CustomTabs
              title="Sucursales:"
              headerColor="info"
              tabs={[
                {
                  tabName: "San José",
                  tabContent: <SucursalSJ></SucursalSJ>
                },
                { tabName: "Cartago" },
                { tabName: "Heredia" }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
