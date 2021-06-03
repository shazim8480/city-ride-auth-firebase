import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import tempImg from "../../images/Map.png";

const useStyles = makeStyles((theme) => ({
  //temporary//
  mapImg: {
    width: "100%",
  },
}));
const Map = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <img className={classes.mapImg} src={tempImg} alt="map" />
    </div>
  );
};

export default Map;
