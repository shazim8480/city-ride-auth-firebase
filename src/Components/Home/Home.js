import { Container, Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useState } from "react";
import Category from "../Category/Category";
import Header from "../Header/Header";
import useStyles from "./HomeStyle";
import rideData from "../../fakeData/rideData";

const Home = () => {
  const fakeRideData = rideData.slice(0, 4); // slicing the fakeData named "rideData.js"//
  const [rides] = useState(fakeRideData);
  const classes = useStyles();
  return (
    <>
      <div className={classes.homeContainer}>
        <CssBaseline />
        {/* header component START */}
        <Header></Header>
        {/* header component END */}

        {/* Category component start */}
        <div>
          <Container className={classes.cardGrid} maxWidth="lg">
            {/* a grid container which contains grids and wraps */}
            <Grid container spacing={4} justify="center">
              {rides.map((rideCategory) => (
                <Category
                  key={rideCategory.id}
                  category={rideCategory}
                ></Category>
              ))}
            </Grid>
          </Container>
        </div>
        {/* Category component end */}
      </div>
    </>
  );
};

export default Home;
