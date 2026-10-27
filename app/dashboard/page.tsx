import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import NavBar from "@/components/NavBar";
import { syncUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // Verify if user is authenticated with Clerk
  const user = await currentUser();
  if (!user) redirect("/");

  await syncUser();

  return (
    <>
      <NavBar />

      <div className="max-w-7xl mx-auto pt-24 px-6 py-8">
        <WelcomeSection />
        <MainActions />
        <ActivityOverview />
      </div>
    </>
  );
};

export default DashboardPage;
