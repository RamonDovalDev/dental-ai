import { syncUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await syncUser();
  if (!user) redirect("/");

  redirect("/dashboard");
};

export default OnboardingPage;
