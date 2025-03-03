import { getUserStats } from "../lib/utils";
import getCurrentUser from "../actions/getCurrentUser";
import WelcomeMessageBox from "./_components/WelcomeMessageBox";
import DashboardCards from "./_components/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts";
import Spinner from "./_components/Spinner";

export const metadata = {
  title: "Dashboard - Fit Flow",
  description: "Fit Flow",
};

export default async function Dashboard() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <Spinner />;
  }

  const { weight, height, name, email } = currentUser;

  const userStats = await getUserStats();

  const userData = {
    weight,
    height,
    name,
    email,
  };

  return (
    <div className="p-6 space-y-6">
      <WelcomeMessageBox userData={userData} />
      <DashboardCards />
      <DashboardCharts userStats={userStats} />
    </div>
  );
}
