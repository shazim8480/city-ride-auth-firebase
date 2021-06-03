import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import categoryStyles from "./CategoryStyle";
import { useHistory } from "react-router";

const Category = (props) => {
  // destructuring data from Category component//
  const { id, rideType, rideImg } = props.category;

  // to navigate to specific ride destinations//
  let history = useHistory();
  const handleClick = () => {
    history.push("/destination/" + id);
  };

  const classes = categoryStyles(); // for css //
  return (
    <>
      <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          {/* card media is for images */}
          <CardMedia
            className={classes.cardMedia}
            image={rideImg}
            title={rideType}
          />
          {/* card media is for images */}
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.cardHeader}
              color="primary"
              align="center"
              variant="h5"
              gutterBottom
            >
              {rideType}
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
              gutterBottom
            >
              Let us take you to your destination safely in a short time. For
              more information, call 999.
            </Typography>
            <CardActions className={classes.cardButton}>
              <Button
                onClick={handleClick}
                size="medium"
                variant="contained"
                color="primary"
              >
                Book Now
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Category;
