import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import NavBar from "@/components/NavBar";

const DashboardPage = () => {
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
