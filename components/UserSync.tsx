"use client";

import { syncUser } from "@/lib/actions/user";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const UserSync = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    // If Clerk hasn't loaden or isn't authenticated, or it's already synced, do nothing
    if (!isLoaded || !isSignedIn || hasSyncedRef.current) return;

    const performSync = async () => {
      hasSyncedRef.current = true;
      try {
        // Sync user with Neon-Prisma
        await syncUser();

        if (pathname === "/") {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error("Error in UserSync:", error);
        hasSyncedRef.current = false;
      }
    };

    void performSync();
  }, [isSignedIn, isLoaded, pathname, router]);

  return null;
};

export default UserSync;
