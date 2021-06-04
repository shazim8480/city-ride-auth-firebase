import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import LoginStyles from "./LoginStyle";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager.js";

initializeLoginFramework();

const SignIn = () => {
  const classes = LoginStyles();
  // use context api from app.js////////////////////
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // use form hook destructuring//
  const {
    register,
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
  const [newUser] = useState(false);
  // default //
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
  });

  //handle submit function //
  const onSubmit = (e) => {
    //  not new user, so sign in using only email and password//
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

  //google sign in handler by import//
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      handleResponse(res, true);
    });
  };

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
            Sign In
          </Typography>

          {/* sign up/in form part start */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleChange}
            className={classes.form}
          >
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

            <br />
            <Typography variant="body1">
              Don't have an account? <Link to="/signUp">Sign Up</Link>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

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
            <br />
            <p style={{ color: "red" }}>{user.error}</p>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
