import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import { Grid, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import destinationStyles from "./DestinationStyle";
import SearchLocation from "./SearchLocation";
import AvailableRides from "./AvailableRides";
import Map from "../Map/Map";

const Destination = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isForm, setIsForm] = useState(true);
  const classes = destinationStyles();
  return (
    <>
      <Container>
        <Header></Header>
        <CssBaseline />
        <Grid container spacing={2} justify="space-evenly">
          <Grid className={classes.searchBoxGrid} item lg={4}>
            {isForm ? (
              <SearchLocation setIsForm={setIsForm}></SearchLocation>
            ) : (
              <AvailableRides></AvailableRides>
            )}
          </Grid>

          <Grid item lg={7}>
            <Map></Map>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Destination;
