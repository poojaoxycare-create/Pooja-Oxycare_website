import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/api";

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !user || !isSignedIn) return;

    const syncUserToBackend = async () => {
      try {
        const token = await getToken();
        
        if (!token) {
          return;
        }

        await api.post(
          "/users/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    syncUserToBackend();
  }, [isLoaded, user, isSignedIn, getToken]);

  return null;
}
