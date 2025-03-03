import WelcomeMessageBox from "./_components/WelcomeMessageBox";

import { getUserStats } from "../lib/utils";

import getCurrentUser from "../actions/getCurrentUser";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";
import DashboardCharts from "./_components/DashboardCharts";
import DashboardCards from "./_components/DashboardCards";

export const metadata = {
  title: "Dashboard - Fit Flow",
  description: "Fit Flow",
};

export default async function Dashboard() {
  const { weight } = await getUserStats();
  const { name, email } = await getCurrentUser();

  const userData = {
    weight,
    email,
    name,
  };

  return (
    <div className="p-6 space-y-6">
      <WelcomeMessageBox userData={userData} />

      <DashboardCards />

      {/* <Suspense fallback={<Spinner />}> */}
      <DashboardCharts />
      {/* </Suspense> */}
    </div>
  );
}
