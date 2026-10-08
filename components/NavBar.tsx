"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, MicIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 px-6 py-2 border-b border-border/50 bg-background backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              className="w-11"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 transition-colors ${pathname === "/dashboard" ? "text-foreground hover:text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            <Link
              href="/appointments"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Appointments</span>
            </Link>

            <Link
              href="/voice"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/voice"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <MicIcon className="w-4 h-4" />
              <span className="hidden md:inline">Voice</span>
            </Link>

            <Link
              href="/pro"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/pro"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <CrownIcon />
              <span>Pro</span>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground mb-1">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>

            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
