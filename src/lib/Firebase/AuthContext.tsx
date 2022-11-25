import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { isFirefox, isMobile } from "react-device-detect";
import { FirebaseAuth } from "./initFirebase";

interface IContext {
  user: firebase.default.UserInfo | null;
  loading: boolean;
  logOut: () => void;
  googleSignIn: () => void;
  githubSignIn: () => void;
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: false,
  logOut: () => {},
  googleSignIn: () => {},
  githubSignIn: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.default.UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    if (isFirefox || !isMobile) {
      await signInWithPopup(FirebaseAuth, provider)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await signInWithRedirect(FirebaseAuth, provider)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
  };

  const githubSignIn = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    if (isFirefox || !isMobile) {
      await signInWithPopup(FirebaseAuth, provider)
    } else {
      await signInWithRedirect(FirebaseAuth, provider);
    }
    setLoading(false);
  };

  const logOut = async () => {
    await signOut(FirebaseAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (u) => {
      if (u) {
        setUser(u);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const cancelAuthListener = FirebaseAuth.onIdTokenChanged((u) => {
  //     setUser(u);
  //     setLoading(false);
  //   });

  //   return () => cancelAuthListener();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, googleSignIn, githubSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, UserAuth };
