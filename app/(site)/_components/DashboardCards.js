import { getUserStats } from "@/app/lib/utils";
import { Dumbbell, Ruler, Weight, Flame } from "lucide-react";

import Link from "next/link";

export default async function DashboardCards() {
  const { totalWorkouts, height, weight, totalCaloriesBurnt } =
    await getUserStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: <Flame size={28} className="text-orange-500" />,
          label: "Calories Burned",
          value: `${totalCaloriesBurnt} kcal`,
        },
        {
          icon: <Dumbbell size={28} className="text-green-500" />,
          label: "Workouts Completed",
          value: totalWorkouts,
        },
        {
          icon: <Weight size={28} className="text-blue-500" />,
          label: "Current Weight",
          value: weight ? (
            `${weight} kg`
          ) : (
            <Link
              className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 px-2 py-1 rounded-md transition"
              href="/profile"
            >
              Add your weight to track progress
            </Link>
          ),
        },
        {
          icon: <Ruler size={28} className="text-purple-500" />,
          label: "Height",
          value: height ? (
            `${height} cm`
          ) : (
            <Link
              href="/profile"
              className="inline-block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 dark:hover:bg-purple-700 px-2 py-1 rounded-md transition"
            >
              Add your height to track progress
            </Link>
          ),
        },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center space-x-4 border border-gray-200 dark:border-gray-700"
        >
          {item.icon}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {item.label}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
