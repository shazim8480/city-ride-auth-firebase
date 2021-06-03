import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import LoginStyles from "./LoginStyle";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager.js";

initializeLoginFramework();

const SignUp = () => {
  const classes = LoginStyles();
  // use context api from app.js////////////////////
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // use form hook destructuring//
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // this triggers validation event on change//
  });

  // to redirect to destination page after authentication//
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // for new user registration//
  const [newUser, setNewUser] = useState(true);
  // default //
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handle submit function //
  const onSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then((res) => {
          handleResponse(res, true);
          console.log(user.email, user.password);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //   // if not new user, then sign in using only email and password//
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          handleResponse(res, true);
          console.log(res.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(e);
    // e.preventDefault();
  };
  const handleChange = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  };

  // without react hook form //
  // const handleBlur = (e) => {
  //   // let isFieldValid = true;
  //   if (e.target.name === "email") {
  //     isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  //   }
  //   if (e.target.name === "password") {
  //     const isPasswordValid = e.target.value.length > 6;
  //     const passwordHasNumber = /\d{1}/.test(e.target.value);
  //     isFieldValid = isPasswordValid && passwordHasNumber;
  //   }
  //   if (e.target.name === "confirmPassword") {
  //     if (user.password !== user.confirmPassword) {
  //       user.confirmPasswordError = "Passwords should match!";
  //     }
  //   }
  //   if (isFieldValid) {
  //     const newUserInfo = { ...user };
  //     newUserInfo[e.target.name] = e.target.value;
  //     setUser(newUserInfo);
  //   }
  // };

  //google sign in handler by import//
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      handleResponse(res, true);
    });
  };
  //google sign out handler by import//
  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      handleResponse(res, false);
    });
  };
  /////////////////////////////////////////

  // function for handling response //
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res); // from context api//
    if (redirect) {
      history.replace(from); // to replace the location after sign in//
    }
  };
  /////////////////////////////////////////////

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {newUser ? "Up" : "In"}
          </Typography>

          {/* sign up/in form part start */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleChange}
            className={classes.form}
          >
            {newUser && (
              <TextField
                name="name"
                value={loggedInUser.name}
                label="Full Name"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                id="name"
                {...register("name", { required: "*Full Name is required" })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
            <TextField
              name="email"
              value={loggedInUser.email}
              label="E-mail Address"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              id="email"
              {...register("email", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid e-mail address",
                },
                required: "*E-mail is required",
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              name="password"
              value={loggedInUser.password}
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              id="password"
              fullWidth
              {...register("password", {
                pattern: {
                  value: /^[A-Za-z]\w{5,9}$/,
                  message:
                    "Password should contain of 6-10 characters and first character must be a letter",
                },
                required: "*Password is required",
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            {newUser && (
              <TextField
                name="confirmPassword"
                value={loggedInUser.confirmPassword}
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
                id="confirmPassword"
                fullWidth
                {...register("confirmPassword", {
                  required: "*Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Password doesn't match!",
                })}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}

            <br />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setNewUser(!newUser)}
                  name="newUser"
                  value={
                    newUser
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"
                  }
                  color="primary"
                  variant="body2"
                />
              }
              label={
                newUser
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"
              }
            />
            {newUser ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            )}
            {/*form part end */}
            <br />
            <Typography variant="body2" align="center">
              OR
            </Typography>
            <Button
              onClick={googleSignIn}
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.googleSubmit}
            >
              Sign in with Google
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
