import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AvatarImage = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    isAuthenticated && (
      <div>
        <img
          className="avatarImg"
          src={user.picture ? user.picture : "https://via.placeholder.com/150"}
        />
      </div>
    )
  );
};

export default AvatarImage;
