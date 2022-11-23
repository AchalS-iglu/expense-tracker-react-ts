import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import config from "../../config";

const FirebaseApp = firebase.initializeApp(config.firebase);
const FirebaseAuth = getAuth(FirebaseApp);
const Firestore = getFirestore(FirebaseApp);

export { FirebaseApp, FirebaseAuth, Firestore };
