import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <SignIn
          path="/sign-in"
          routing="path"
          appearance={{ baseTheme: "dark" }}
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
}
