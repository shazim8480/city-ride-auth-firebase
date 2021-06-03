import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Login/SignUp";
import Destination from "./Components/Destination/Destination";
import Error from "./Components/Error/Error";
import AvailableRides from "./Components/Destination/AvailableRides";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
export const UserContext = createContext();
export const LocationContext = createContext();

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",

    button: {
      fontFamily: "Montserrat",
      fontWeight: 700,
    },
  },
});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [location, setLocation] = useState({});
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <LocationContext.Provider value={[location, setLocation]}>
          <Router>
            <Switch>
              <Route path="/home">
                <Home></Home>
              </Route>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/signUp">
                <SignUp></SignUp>
              </Route>
              <PrivateRoute path="/destination/:rideId">
                <Destination />
              </PrivateRoute>
              <PrivateRoute path="/availableRides">
                <AvailableRides />
              </PrivateRoute>
              <Route path="*">
                <Error></Error>
              </Route>
            </Switch>
          </Router>
        </LocationContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
