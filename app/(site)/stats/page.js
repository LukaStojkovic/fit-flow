import { Suspense } from "react";
import StatsContent from "../_components/StatsContent";
import SkeletonStatsPage from "../_components/StatsPageSkeleton";

export const metadata = {
  title: "Stats",
  description: "Fit Flow",
};

export default function Stats() {
  return (
    <div className="p-6 space-y-6  dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        📊 Your Fitness Stats
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Track your progress and achievements here.
      </p>
      {/* <Suspense fallback={<SkeletonStatsPage />}> */}
      <StatsContent />
      {/* </Suspense> */}
    </div>
  );
}
