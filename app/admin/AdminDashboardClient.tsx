"use client";

import NavBar from "@/components/NavBar";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import React from "react";

const AdminDashboardClient = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto pt-24 px-6 py-8">
        {/* Admin Welcome Section */}
        <div className="flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-10 rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Admin Dashboard
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}
              </h1>
              <p className="text-muted-foreground">
                Manage doctors, oversee appointments, and monitor your dental
                practice performance
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardClient;
