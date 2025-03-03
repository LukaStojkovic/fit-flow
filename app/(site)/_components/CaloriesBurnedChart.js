"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CaloriesBurnedChart({ caloriesBurntPerMonth }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const hasData = caloriesBurntPerMonth && caloriesBurntPerMonth.length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🔥 Calories Burned (Monthly)
      </h2>

      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={caloriesBurntPerMonth}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e0e0e0"}
            />
            <XAxis dataKey="date" stroke={isDark ? "#d1d5db" : "#8884d8"} />
            <YAxis stroke={isDark ? "#d1d5db" : "#8884d8"} />
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
            <Legend />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#FF7E39"
              strokeWidth={3}
              dot={{ r: 5, fill: "#FF7E39" }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No calorie data recorded yet. Start tracking your workouts to see
            your progress!
          </p>
          <Link
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            href="/workouts"
          >
            Start Workout
          </Link>
        </div>
      )}
    </div>
  );
}
