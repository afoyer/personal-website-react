import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Profile: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
    context.signOut,
  ]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg pointer-events-auto">
        User Profile
      </h1>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 mb-6 pointer-events-auto">
        <div className="space-y-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Email</p>
            <p className="text-white text-lg font-medium">
              {user?.signInDetails?.loginId}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">User ID</p>
            <p className="text-white text-lg font-mono">{user?.userId}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pointer-events-auto">
        <button
          onClick={signOut}
          className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white font-semibold rounded-lg backdrop-blur-sm border border-red-500/30 transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
