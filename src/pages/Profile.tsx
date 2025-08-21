import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Profile: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
    context.signOut,
  ]);

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Email:</strong> {user?.signInDetails?.loginId}
        </p>
        <p>
          <strong>User ID:</strong> {user?.userId}
        </p>
      </div>

      <div className="profile-actions">
        <button onClick={signOut} className="btn btn-secondary">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
