import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const WelcomeSection = async () => {
  const user = await currentUser();

  return (
    <div className="relative z-10 flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 overflow-hidden mb-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <div className="rounded-full size-2 bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            Online & Ready
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
                ? "afternoon"
                : "evening"}
            , {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Your personal AI Dental Assistant is ready to help you mantain
            perfect oral health.
          </p>
        </div>
      </div>
      <div className="lg:flex hidden items-center justify-center size-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full">
        <Image
          src="/logo.png"
          alt="logo"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
