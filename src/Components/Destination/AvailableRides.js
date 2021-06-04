import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import rideData from "../../fakeData/rideData";
import { LocationContext } from "../../App";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import locationDesign from "../../images/location-design.png";

const useStyles = makeStyles((theme) => ({
  rideLocation: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#002984",
    borderRadius: "10px",
    color: "#ffff",
    padding: theme.spacing(3, 2, 3),
    marginBottom: theme.spacing(4),
  },
  availableRides: {
    width: "100%",
    height: "100%",
    background: "#fffff",
    borderRadius: "10px",
  },
  availableRideDetails: {
    display: "flex",

    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "0px 5px",
    backgroundColor: "#f5f5f5",
    marginBottom: "20px",
  },

  rideImage: {
    width: "80px",
    height: "50px",
  },
  bookingButton: {
    margin: theme.spacing(1, 0, 1.5),
    padding: theme.spacing(1.5, 0),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  showLocation: {
    marginLeft: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
    // marginRight: theme.spacing(4),
  },
}));
// /////////////////////////////////// modal start //////////////////////////////////

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// ///////////////////////////////////  modal end //////////////////////////////////
const AvailableRides = () => {
  const classes = useStyles(); // styling
  const { rideId } = useParams();
  //FINDING THE individual ride id for showing the details for each ride
  const bookingData = rideData.find((rd) => rd.id === rideId);
  console.log(bookingData);
  const [location] = useContext(LocationContext);
  // modal //
  const [open, setOpen] = React.useState(false);
  const DialogTitle = withStyles(useStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle {...other}>
        <Typography noWrap align="left" variant="h6" className={classes.title}>
          CITY RIDE
          <Typography variant="subtitle2">
            Comfort || Safety || Convenience
          </Typography>
        </Typography>
      </MuiDialogTitle>
    );
  });
  // modal//
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // modal //
  return (
    <>
      <div className={classes.availableRides}>
        <div className={classes.rideLocation}>
          <img src={locationDesign} alt="loc-des" />
          <div className={classes.showLocation}>
            <Typography variant="h6">{location.pickUpLocation}</Typography>
            <br />
            <Typography variant="h6">{location.dropOffLocation}</Typography>
          </div>
        </div>
        {/* standard */}
        <div className={classes.availableRideDetails}>
          <img className={classes.rideImage} src={bookingData.rideImg} alt="" />
          <Typography variant="body1">{bookingData.standardRide}</Typography>
          <PeopleAltIcon fontSize="small"></PeopleAltIcon>
          <Typography variant="body1">{bookingData.rideSeats}</Typography>
          <Typography variant="body1">{bookingData.standardPrice}</Typography>
        </div>
        {/* business class */}
        <div className={classes.availableRideDetails}>
          <img className={classes.rideImage} src={bookingData.rideImg} alt="" />
          <Typography variant="body1">{bookingData.luxuryRide}</Typography>
          <PeopleAltIcon fontSize="small"></PeopleAltIcon>
          <Typography variant="body1">{bookingData.rideSeats}</Typography>
          <Typography variant="body1">{bookingData.luxuryPrice}</Typography>
        </div>

        <Button
          className={classes.bookingButton}
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          fullWidth
        >
          Book Now
        </Button>

        {/* ////////////////////////////////////////////// */}
        {/* For Modal on button click */}
        <div>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            ></DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Once you confirm, you can't cancel the ride. Charges might
                differ according to traffic and emergency situations.
              </Typography>
              <Typography gutterBottom>
                Please be sure to wear a mask. Have a safe ride. For more
                details, call 999
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                component={Link}
                to="/home"
                // onClick={handleClose}
                color="primary"
              >
                Confirm Ride
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AvailableRides;
