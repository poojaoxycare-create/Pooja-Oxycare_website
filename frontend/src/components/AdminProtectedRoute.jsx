import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
