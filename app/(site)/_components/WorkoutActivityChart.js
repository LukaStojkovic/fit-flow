"use client";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function WorkoutActivityChart({ workoutData }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const hasData = workoutData && workoutData.length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 group transition-all">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🏋️ Workout Activity
      </h2>

      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workoutData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <XAxis dataKey="month" stroke={isDark ? "#d1d5db" : "#6b7280"} />
            <YAxis stroke={isDark ? "#d1d5db" : "#6b7280"} />
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
            <Legend wrapperStyle={{ color: isDark ? "#d1d5db" : "#374151" }} />
            <Bar
              dataKey="workouts"
              fill="#6366F1"
              barSize={40}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No workouts recorded yet. Start your first workout to see progress!
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
