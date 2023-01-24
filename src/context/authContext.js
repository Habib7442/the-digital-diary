// import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import { Alert } from "@mui/material";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    // return auth.signOut();
    firebase
      .auth()
      .signOut()
      .then(function () {
        return <Alert variant="danger">Logout Successful</Alert>;
      })
      .catch(function (error) {
        setError("Something Went wrong! Try Again");
      });
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  // export const AuthContext = createContext();

  // export const AuthProvider = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState(
  //     JSON.parse(localStorage.getItem("user")) || null
  //   );

  //   const login = async (inputs) => {
  //     const res = await axios.post("/auth/login", inputs);
  //     setCurrentUser(res.data);
  //   };
  //   const logout = async () => {
  //     await axios.post("/auth/logout");
  //     setCurrentUser(null);
  //   };

  //   useEffect(() => {
  //     localStorage.setItem("user", JSON.stringify(currentUser));
  //   }, [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
