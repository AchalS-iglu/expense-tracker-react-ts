import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

import config from "../config";

const initFireBase = () => {
  if (!firebase.apps.length) {
    var App = firebase.initializeApp(config.firebase);
    return App;
  }
};

const FirebaseApp = initFireBase();
const FirebaseAuth = getAuth(FirebaseApp);

export { FirebaseApp, FirebaseAuth };
