import {
  Flame,
  Dumbbell,
  Watch,
  TrendingUp,
  HeartPulse,
  Trophy,
} from "lucide-react";
import WorkoutActivityChart from "../_components/WorkoutActivityChart";
import CaloriesBurnedChart from "../_components/CaloriesBurnedChart";
import WorkoutConsistencyChart from "../_components/WorkoutConsistencyChart";
import MiniCard from "../_components/MiniCard";
import { getUserStats } from "@/app/lib/utils";

export default async function StatsContent() {
  const {
    totalWorkouts,
    avgWorkoutDuration,
    totalCaloriesBurnt,
    workoutData,
    consistencyData,
    completedWorkouts,
    caloriesBurntPerMonth,
    totalAvgHeartRate,
    maxWeightLifted,
  } = await getUserStats();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <Dumbbell size={28} className="text-indigo-500" />,
            label: "Total Workouts",
            value: totalWorkouts,
          },
          {
            icon: <Flame size={28} className="text-orange-500" />,
            label: "Calories Burned",
            value: `${totalCaloriesBurnt} kcal`,
          },
          {
            icon: <Watch size={28} className="text-blue-500" />,
            label: "Avg. Workout Duration",
            value: `${avgWorkoutDuration} mins`,
          },
          {
            icon: <Trophy size={28} className="text-green-500" />,
            label: "Most Weight Lifted",
            value: `${maxWeightLifted} kg`,
          },
          {
            icon: <TrendingUp size={28} className="text-purple-500" />,
            label: "Workout Consistency",
            value: `${consistencyData[0].value}%`,
          },
          {
            icon: <HeartPulse size={28} className="text-red-500" />,
            label: "Avg. Heart Rate",
            value: `${totalAvgHeartRate} bpm`,
          },
        ].map((item) => (
          <MiniCard
            label={item.label}
            value={item.value}
            icon={item.icon}
            key={item.label}
          />
        ))}
      </div>

      <WorkoutActivityChart workoutData={workoutData} />

      <CaloriesBurnedChart caloriesBurntPerMonth={caloriesBurntPerMonth} />

      <WorkoutConsistencyChart
        consistencyData={consistencyData}
        completedWorkouts={completedWorkouts}
      />
    </>
  );
}
