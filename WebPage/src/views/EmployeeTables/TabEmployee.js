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
import AdminTable from "views/EmployeeTables/AdminTableSucursal.js";
import EmployeeTable from "views/EmployeeTables/EmployeesTable.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);
export default function Employee() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody>
            <CustomTabs
              title="Sucursales:"
              headerColor="info"
              tabs={[
                {
                  tabName: "Administradores de sucursal",
                  tabContent: <AdminTable></AdminTable>
                },
                {
                  tabName: "Empleados",
                  tabContent: <EmployeeTable></EmployeeTable>
                }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
