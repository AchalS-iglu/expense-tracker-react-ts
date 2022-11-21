import React, { useContext, createContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseAuth } from "./initFirebase";

interface IContext {
  // user: firebase.User | null;
  // loading: boolean;
  googleSignIn: () => void;
  // logout: () => {};
}

const AuthContext = createContext<IContext>({
  // user: null,
  // loading: false,
  // logout: () => { },
  googleSignIn: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(FirebaseAuth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, UserAuth };
