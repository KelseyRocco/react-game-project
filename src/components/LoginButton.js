import "../App.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MainTitle from "./MainTitle";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div>
        <button className="auth-btn" onClick={() => loginWithRedirect()}>
          Sign In
        </button>
        <MainTitle />
      </div>
    )
  );
};

export default LoginButton;
