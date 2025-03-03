"use client";

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
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
        You’ve completed {completedWorkouts.count} workouts last 30 days. Keep
        going!
      </p>
    </div>
  );
}
