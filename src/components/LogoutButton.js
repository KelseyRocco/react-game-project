import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import "../App.css";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="contianer">
        <button className="auth-btn" onClick={() => logout()}>
          Sign out
        </button>
      </div>
    )
  );
};

export default LogoutButton;
