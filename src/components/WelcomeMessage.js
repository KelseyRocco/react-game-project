import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const WelcomeMessage = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    isAuthenticated && (
      <div className="container">
        <h2>Good luck {user.given_name ? user.given_name : "player"}!</h2>
      </div>
    )
  );
};

export default WelcomeMessage;
