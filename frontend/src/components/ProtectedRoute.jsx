import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();
  const location = useLocation();

  if (isSignedIn) return children;

  // Not signed in -> send to sign-in page, preserve attempted URL in state
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
}
