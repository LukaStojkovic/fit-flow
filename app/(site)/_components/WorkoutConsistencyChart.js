"use client";

import { useTheme } from "next-themes";
import {
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function WorkoutConsistencyChart({
  consistencyData,
  completedWorkouts,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        ⚡ Workout Consistency
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={consistencyData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            fill="#22C55E"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1F2937" : "#fff",
              color: isDark ? "#e5e7eb" : "#000",
              borderRadius: "8px",
              border: isDark ? "1px solid #374151" : "1px solid #ddd",
            }}
            wrapperStyle={{ outline: "none" }}
            labelStyle={{ color: isDark ? "#d1d5db" : "#374151" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
        You’ve completed {completedWorkouts.count} workouts last 30 days. Keep
        going!
      </p>
    </div>
  );
}
