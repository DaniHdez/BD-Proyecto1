import React from "react";
//import "date-fns";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);
//Crear función para obtener valores db segun fecha

export default function Sucursal() {
  const classes = useStyles();
  //   const [selectedDate, setSelectedDate] = React.useState(
  //     new Date("2014-08-18T21:11:54")
  //   );

  //   const handleDateChange = date => {
  //     setSelectedDate(date);
  //   };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader></CardHeader>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
