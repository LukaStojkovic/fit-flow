"use client";

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

export default function WeightProgressChart({ weightData }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        📊 Weight Progress
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis domain={[70, 80]} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            wrapperStyle={{ outline: "none" }}
            labelStyle={{ color: "#374151" }}
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 5, fill: "#6366F1" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
