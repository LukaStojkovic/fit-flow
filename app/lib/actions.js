"use server";

import User from "./models/User";
import Workout from "./models/Workout";
import dbConnect from "./mongo";
import { revalidatePath } from "next/cache";
import { calculateCalories, calculateHeartRate } from "./utils";

export async function getUserWorkouts(userId) {
  await dbConnect();

  const workouts = await Workout.find({ user: userId }).lean();

  return workouts.map((workout) => ({
    name: workout.name,
    user: workout.user.toString(),
    date: workout.date.toISOString(),
    _id: workout._id.toString(),
    workoutType: workout.workoutType,
    duration: workout.duration,
    exercises: Array.isArray(workout.exercises)
      ? workout.exercises.map(({ _id, ...exercise }) => exercise)
      : [],
    caloriesBurnt: workout.caloriesBurnt,
    avgHeartRate: workout.avgHeartRate,
  }));
}

export async function getWorkoutById(workoutId) {
  await dbConnect();

  const workout = await Workout.findById(workoutId).lean();

  return {
    ...workout,
    _id: workout._id.toString(),
    user: workout.user.toString(),
    date: workout.date.toISOString(),
    exercises: Array.isArray(workout.exercises)
      ? workout.exercises.map(({ _id, ...exercise }) => exercise)
      : [],
  };
}

export async function CreateWorkout(userId, formData) {
  await dbConnect();
  const { name, workoutType, duration, date, exercises } = formData;

  const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);

  const totalReps = exercises.reduce((sum, exercise) => sum + exercise.reps, 0);

  const user = await User.findById(userId);

  if (!name || !workoutType || !duration || !date || !userId) {
    throw new Error("Missing required fields");
  }

  const formattedData = {
    ...formData,
    user: userId,
    notes: "",
    date: new Date(date).toISOString(),
    caloriesBurnt: calculateCalories(
      user.weight,
      duration,
      workoutType,
      exercises.length,
      totalSets,
      totalReps
    ),
    avgHeartRate: calculateHeartRate(
      user.age,
      user.gender,
      workoutType,
      exercises.length,
      totalSets,
      totalReps
    ),
  };

  await Workout.create(formattedData);

  revalidatePath("/workouts");
}

export async function deleteWorkout(workoutId) {
  await dbConnect();

  await Workout.findByIdAndDelete(workoutId);

  revalidatePath("/workouts");
}

export async function updateUserWorkout(workoutId, data) {
  await dbConnect();

  await Workout.findByIdAndUpdate(workoutId, data);

  revalidatePath(`/workouts/${workoutId}`);
}

export async function updateUserData(userId, data) {
  await dbConnect();

  const updatedData = { ...data };

  if (data.weight) {
    updatedData.$push = {
      weightHistory: { date: new Date().toISOString(), weight: data.weight },
    };
  }

  await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    upsert: true,
  }).lean();

  revalidatePath(`/profile`);
}
