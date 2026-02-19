import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <SignUp
          path="/sign-up"
          routing="path"
          appearance={{ baseTheme: "dark" }}
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
}
