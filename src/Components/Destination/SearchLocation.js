import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { LocationContext } from "../../App";
import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import rideData from "../../fakeData/rideData";

const useStyles = makeStyles((theme) => ({
  formField: {
    padding: "0px 10px",
    paddingTop: theme.spacing(3),
    // - The TextField-root
    // (Note: space or no space after & matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {
      // - The Input-root, inside the TextField-root
      "& fieldset": {
        // - The <fieldset> inside the Input-root
        borderColor: "#fff", // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: "blue", // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {
        // - Set the Input border when parent is focused
        borderColor: "primary",
      },
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "96%",
      "& .MuiInputBase-input": {
        background: "#fff",
        borderRadius: "4px",
      },
    },
  },
  locationText: {
    marginLeft: "10px",
    fontWeight: "700",
  },
  searchBtn: {
    width: "96%",
    marginLeft: "10px",
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 0),
  },
  formInputs: {
    marginBottom: theme.spacing(2),
  },
  errorText: {
    color: "red",
    marginLeft: theme.spacing(3),
  },
}));

const SearchLocation = (props) => {
  const classes = useStyles(); // styling
  // context api for location from app.js //
  const [location, setLocation] = useContext(LocationContext);
  const { pickUpLocation, dropOffLocation } = location; //destructuring

  //FINDING THE individual ride id for showing the details for each ride
  const { rideId } = useParams();
  const bookingData = rideData.find((rd) => rd.id === rideId);
  console.log(bookingData);

  // const handleChange = (e) => {
  //   setLocation({ ...location, [e.target.name]: e.target.value }); // handle the changes in each field simultaneously//
  // }; // no need, already included in handleBlur function//

  const handleSubmit = (e) => {
    console.log("form submitted", location);
    e.preventDefault();
  };

  ///// validation /////////////////
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "pickUpLocation") {
      isFieldValid = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/.test(e.target.value);
    }
    if (e.target.name === "dropOffLocation") {
      isFieldValid = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/.test(e.target.value);
    }

    if (isFieldValid) {
      const newLocationInfo = { ...location };
      newLocationInfo[e.target.name] = e.target.value;
      setLocation(newLocationInfo);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={classes.formField}
        noValidate
        autoComplete="off"
      >
        <div className={classes.formInputs}>
          <Typography
            gutterBottom
            className={classes.locationText}
            variant="h6"
          >
            Pick-up From
          </Typography>
          <TextField
            id="pickup"
            name="pickUpLocation"
            label="Enter Pick-up Location"
            variant="outlined"
            margin="normal"
            fullWidth
            onBlur={handleBlur}
            value={pickUpLocation}
          />
        </div>
        <Typography
          gutterBottom
          className={classes.locationText}
          variant="h6"
          component="h2"
        >
          Drop-off To
        </Typography>
        <TextField
          id="pickup"
          name="dropOffLocation"
          label="Enter Drop-off Location"
          variant="outlined"
          margin="normal"
          fullWidth
          value={dropOffLocation}
          onBlur={handleBlur}
        />
        <Button
          onClick={() => props.setIsForm(false)}
          // type="submit" //this button changes the form to false to show another component//
          variant="contained"
          color="primary"
          className={classes.searchBtn}
        >
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchLocation;
