import { AppMode, AuthProvider } from "@arcana/auth";
import { useState } from "react";

const appAdd = "141246e1edd05c388b3459062b862f42f0ddf7f6";

const auth = new AuthProvider(appAdd);

const UseArcanaAuth = () => {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // initlaise
  const initializeAuth = async () => {
    await auth.init();
    setInitialized(true);
    console.log(initialized);
  };
  return { initializeAuth };
};

export default UseArcanaAuth;
