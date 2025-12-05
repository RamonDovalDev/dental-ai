import { Button } from "@/components/ui/button";
import { SignOutButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex justify-center gap-2">
      <SignUpButton mode="modal">
        <Button>SignUp</Button>
      </SignUpButton>
      <SignOutButton>
        <Button>SignOut</Button>
      </SignOutButton>
    </div>
  );
};

export default HomePage;
