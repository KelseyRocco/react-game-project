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
        <h3>How to play:</h3>
        <p>Shoot your opponent before they shoot you!</p>
        <p>You must have bullets in your gun before you can shoot.</p>
        <p>You can block incoming shots by using the sheild.</p>
      </div>
    )
  );
};

export default LoginButton;
