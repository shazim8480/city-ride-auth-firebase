import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  // condition for not appearing "firebase default" prompt every time//
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

//google sign in method //
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return (
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        };
        return signedInUser;

        //   console.log(displayName, email, photoURL);
      })
      //handle error//
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      })
  );
};

// user sign out method //
export const handleSignOut = () => {
  return (
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isLoggedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        return signedOutUser;
        // console.log(res);
      })

      // handle error//
      .catch((err) => {
        console.log(err);
      })
  );
};

////////////////////////////////////////////////////////////////

// for creating new user //
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserInfo(name);
      console.log(newUserInfo);
      return newUserInfo;
    })
    .catch((error) => {
      // to show error message properly////////////////////////////////
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
    });
};

// for sign in//
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
      //   console.log("User info", res.user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // ..
    });
};
// // update user info while registration//
const updateUserInfo = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name, //only updating name field for now//
    })
    .then(function () {
      console.log("Update successful.");
    })
    .catch(function (error) {
      console.log("An error happened.", error);
    });
};
