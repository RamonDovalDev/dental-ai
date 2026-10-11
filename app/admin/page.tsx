import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // User is not the Adin
  if (!adminEmail || userEmail !== adminEmail) {
    redirect("/");
  }

  return <AdminDashboardClient />;
};

export default AdminPage;
