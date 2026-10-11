import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminPaage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // User is not the Admin
  if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard");

  return <AdminDashboardClient />;
};

export default AdminPaage;
