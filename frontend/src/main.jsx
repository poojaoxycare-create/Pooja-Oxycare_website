import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import App from "./App.jsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkKey} appearance={{ baseTheme: "dark" }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
