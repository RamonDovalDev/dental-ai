"use client";

import { syncUser } from "@/lib/actions/user";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const UserSync = () => {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleUserSync = async () => {
      if (isSignedIn && isLoaded) {
        try {
          await syncUser();
        } catch (error) {
          console.log("Failed to sync user", error);
        }
      }
    };

    handleUserSync();
  }, [isSignedIn, isLoaded]);

  return null;
};

export default UserSync;
