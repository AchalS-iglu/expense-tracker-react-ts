import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseAuth } from "./initFirebase";

interface IContext {
  user: firebase.default.UserInfo | null;
  // loading: boolean;
  logOut: () => void;
  googleSignIn: () => void;
}

const AuthContext = createContext<IContext>({
  user: null,
  // loading: false,
  logOut: () => {},
  googleSignIn: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.default.UserInfo | null>(null);

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

  const logOut = () => {
    signOut(FirebaseAuth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User", currentUser);
      } else {
        setUser(null);
        console.log("User", currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, UserAuth };
