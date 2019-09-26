import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Ofice from "@material-ui/icons/CardTravel";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { tipoSJ, tipoC, tipoH, topClient } from "variables/general.js";

import {
  montoRecaudadoSucursalChart,
  montoRecaudadoTipoChart,
  clientesSucursalChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>room</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Ubicación</p>
              <h3 className={classes.cardTitle}>Heredia</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Ofice />
                Oficinas centrales
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AttachMoney />
              </CardIcon>
              <p className={classes.cardCategory}>Recaudado</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Clientes</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={montoRecaudadoSucursalChart.data}
                type="Bar"
                options={montoRecaudadoSucursalChart.options}
                responsiveOptions={
                  montoRecaudadoSucursalChart.responsiveOptions
                }
                listener={montoRecaudadoSucursalChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Monto recaudado por sucursal
              </h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />
                </span>{" "}
                Mejor sucursal en ventas:
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={montoRecaudadoTipoChart.data}
                type="Bar"
                options={montoRecaudadoTipoChart.options}
                responsiveOptions={montoRecaudadoTipoChart.responsiveOptions}
                listener={montoRecaudadoTipoChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Monto recaudado por tipo</h4>
              <p className={classes.cardCategory}>General</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={clientesSucursalChart.data}
                type="Bar"
                options={clientesSucursalChart.options}
                responsiveOptions={clientesSucursalChart.responsiveOptions}
                listener={clientesSucursalChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Clientes por sucursal</h4>
              <p className={classes.cardCategory}>
                Sucursal con mayor numero de clientes:
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Monto recaudado:"
            headerColor="primary"
            tabs={[
              {
                tabName: "San José",
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Tipo", "Recaudado"]}
                    tableData={tipoSJ}
                  />
                )
              },
              {
                tabName: "Cartago",
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Tipo", "Recaudado"]}
                    tableData={tipoC}
                  />
                )
              },
              {
                tabName: "Heredia",
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Tipo", "Recaudado"]}
                    tableData={tipoH}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Clientes</h4>
              <p className={classes.cardCategoryWhite}>Top 3, general</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Nombre", "Categoria", "Sucursal"]}
                tableData={topClient}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
