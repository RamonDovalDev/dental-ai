"use client";

import { useUser } from "@clerk/nextjs";
import NavBar from "../NavBar";
import { SettingsIcon } from "lucide-react";
import AdminStats from "./AdminStats";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useGetAppointments } from "@/hooks/use-appointments";
import DoctorManagement from "./DoctorManagement";

const AdminDashboardClient = () => {
  const { user } = useUser();

  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
  const { data: appointments = [] } = useGetAppointments();

  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doctor) => doctor.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter(
      (appointment) => appointment.status === "COMPLETED",
    ).length,
  };

  if (doctorsLoading) {
    return <LoadingUI />;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto pt-24 px-6 py-8">
        {/* Admin Welcome Section */}
        <div className="flex items-center justify-between mb-12 bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl border border-primary/20 p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/10">
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
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-linear-to-br from-primry/20 to-primary/10">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />

        <DoctorManagement />
      </div>
    </div>
  );
};

export default AdminDashboardClient;

const LoadingUI = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto pt-24 px-6 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-primary border-t-transparent animate-spin" />
            <p>Loading Dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
