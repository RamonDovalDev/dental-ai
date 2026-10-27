"use client";

import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="w-11"
          />
          <span className="font-semibold text-lg">Dental-AI</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            How It Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            About
          </a>
        </div>

        {/* Authentication Actions */}
        <div className="flex items-center gap-3">
          {/* If user isn't signed in */}
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button size="sm" className="cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>

          {/* If user is logged-in, show Dashboard and Sign Out Button */}
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button size="sm" className="cursor-pointer">
                Dashboard
              </Button>
            </Link>

            <SignOutButton redirectUrl="/">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Sign Out
              </Button>
            </SignOutButton>
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Header;
