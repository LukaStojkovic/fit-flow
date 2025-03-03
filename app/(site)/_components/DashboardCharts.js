import { calculateWorkoutActivity, getUserStats } from "@/app/lib/utils";
import WeightProgressChart from "./WeightProgressChart";
import WorkoutActivityChart from "./WorkoutActivityChart";

export default async function DashboardCharts() {
  const workoutData = await calculateWorkoutActivity();
  const { weightData } = await getUserStats();

  return (
    <>
      <WeightProgressChart weightData={weightData} />

      <WorkoutActivityChart workoutData={workoutData} />
    </>
  );
}
