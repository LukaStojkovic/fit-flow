import getCurrentUser from "../actions/getCurrentUser";
import { MET_VALUES } from "../constants/constants";
import { getUserWorkouts } from "./actions";
import { subDays, isWithinInterval, format } from "date-fns";

export function calculateCalories(
  weight,
  duration,
  workoutType,
  exercises,
  sets,
  reps
) {
  const MET = MET_VALUES[workoutType] || 6.0;

  let intensity = 1.0;
  if (exercises >= 6 || sets >= 4 || reps >= 12) {
    intensity = 1.1;
  } else if (exercises <= 3 || sets <= 2 || reps <= 8) {
    intensity = 0.9;
  }

  const calories = ((MET * weight * 3.5) / 200) * duration * intensity;
  return Math.round(calories);
}

// CALCULATE AVG HEART RATE FOR ONE WORKOUT
export function calculateHeartRate(
  age,
  gender,
  workoutType,
  exercises,
  sets,
  reps
) {
  const restingHR = gender === "male" ? 65 : 70;

  const workoutIntensity = {
    "pull-day": 0.65,
    "push-day": 0.7,
    "leg-day": 0.75,
  };

  const baseIntensity = (exercises * sets * reps) / 200;
  const adjustedIntensity = Math.min(
    1.0,
    baseIntensity + workoutIntensity[workoutType]
  );

  const maxHR = 220 - age;

  const averageHR = Math.round(
    restingHR + (maxHR - restingHR) * adjustedIntensity
  );

  return averageHR;
}

// CALCULATE AVG HEART RATE TOTAL
export async function calculateTotalAvgHeartRate() {
  const currentUser = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(currentUser?._id);

  if (!userWorkouts || userWorkouts.length === 0) {
    return 0;
  }

  let totalHR = 0;
  let validWorkouts = 0;

  userWorkouts.forEach((workout) => {
    const { workoutType, exercises } = workout;

    const totalSets = exercises.reduce(
      (sum, exercise) => sum + (exercise.sets || 0),
      0
    );
    const totalReps = exercises.reduce(
      (sum, exercise) => sum + (exercise.reps || 0),
      0
    );

    if (totalSets === 0 || totalReps === 0) {
      return;
    }

    const avgHR = calculateHeartRate(
      currentUser.age,
      currentUser.gender,
      workoutType,
      exercises.length,
      totalSets,
      totalReps
    );

    totalHR += avgHR;
    validWorkouts++;
  });

  return validWorkouts > 0 ? Math.round(totalHR / validWorkouts) : 0;
}

export const calculateAverageDuration = (userWorkouts) => {
  if (!userWorkouts || userWorkouts.length === 0) return 0;

  const totalDuration = userWorkouts.reduce((sum, workout) => {
    return sum + (workout.duration || 0);
  }, 0);

  const averageDuration = totalDuration / userWorkouts.length;

  return averageDuration.toFixed(2);
};

export async function getUserStats() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      totalWorkouts: 0,
      avgWorkoutDuration: 0,
      weight: null,
      height: null,
      totalCaloriesBurnt: 0,
      weightData: [],
      workoutData: [],
      caloriesBurntPerMonth: [],
      consistencyData: [],
      totalAvgHeartRate: 0,
      completedWorkouts: 0,
      maxWeightLifted: 0,
    };
  }

  const userWorkouts = await getUserWorkouts(currentUser?._id);

  const workoutData = await calculateWorkoutActivity();
  const caloriesBurntPerMonth = await calculateCaloriesBurntPerMonth();
  const consistencyData = await calculateWorkoutConsistency();
  const completedWorkouts = await calculateCompletedWorkouts();
  const totalAvgHeartRate = await calculateTotalAvgHeartRate();

  const totalWorkouts = userWorkouts.length;
  const avgWorkoutDuration = calculateAverageDuration(userWorkouts);

  const totalCaloriesBurnt = userWorkouts.reduce((sum, workout) => {
    return sum + workout.caloriesBurnt;
  }, 0);

  const maxWeightLifted = await calculateMaxWeightLifted();

  const formattedWeightHistory = currentUser?.weightHistory.map((entry) => {
    const date = new Date(entry.date).toLocaleString("default", {
      month: "short",
      day: "numeric",
    });
    return {
      ...entry,
      date,
    };
  });

  return {
    totalWorkouts,
    avgWorkoutDuration,
    weight: currentUser?.weight,
    height: currentUser?.height,
    totalCaloriesBurnt,
    weightData: formattedWeightHistory,
    workoutData,
    caloriesBurntPerMonth,
    consistencyData,
    totalAvgHeartRate,
    completedWorkouts,
    maxWeightLifted,
  };
}

export async function calculateWorkoutActivity() {
  const { _id } = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(_id);

  const workoutActivityData = Object.values(
    userWorkouts.reduce((acc, workout) => {
      const month = format(new Date(workout.date), "MMM");

      if (!acc[month]) {
        acc[month] = { workouts: 0, month };
      }

      acc[month].workouts += 1;

      return acc;
    }, {})
  );

  return workoutActivityData;
}

export async function calculateCaloriesBurntPerMonth() {
  const { _id } = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(_id);

  const caloriesBurntMonthly = Object.values(
    userWorkouts.reduce((acc, workout) => {
      const date = format(new Date(workout.date), "dd-MM");

      if (!acc[date]) {
        acc[date] = { calories: 0, date };
      }

      acc[date].calories += workout.caloriesBurnt;

      return acc;
    }, {})
  );

  return caloriesBurntMonthly;
}

export async function calculateWorkoutConsistency(periodDays = 30) {
  const { _id } = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(_id);

  if (!userWorkouts || userWorkouts.length === 0) {
    return [{ name: "Consistency", value: "0.00" }];
  }

  const today = new Date();
  const startDate = subDays(today, periodDays - 1);

  const workoutDays = new Set();

  userWorkouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);

    if (workoutDate > today) {
      return;
    }

    if (isWithinInterval(workoutDate, { start: startDate, end: today })) {
      const formattedDate = format(workoutDate, "yyyy-MM-dd");

      workoutDays.add(formattedDate);
    }
  });

  const consistency = (workoutDays.size / periodDays) * 100;

  return [{ name: "Consistency", value: Number(consistency.toFixed(2)) }];
}

export async function calculateCompletedWorkouts(periodDays = 30) {
  const { _id } = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(_id);

  if (!userWorkouts || userWorkouts.length === 0) {
    return { count: 0 };
  }

  const today = new Date();
  const startDate = subDays(today, periodDays);

  const completedWorkouts = userWorkouts.filter((workout) => {
    const workoutDate = new Date(workout.date);

    return (
      isWithinInterval(workoutDate, { start: startDate, end: today }) &&
      workoutDate <= today
    );
  });

  return { count: completedWorkouts.length };
}

export async function calculateMaxWeightLifted() {
  const { _id } = await getCurrentUser();
  const userWorkouts = await getUserWorkouts(_id);

  let maxWeight = 0;

  userWorkouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.weight > maxWeight) maxWeight = exercise.weight;
    });
  });

  return maxWeight;
}
