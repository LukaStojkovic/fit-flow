"use client";

import { updateUserWorkout } from "@/app/lib/actions";
import { Edit, Edit2, Flame, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import React from "react";

export default function WorkoutDetails({ workout, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    duration: workout.duration,
    date: new Date(workout.date).toISOString().split("T")[0],
    notes: workout.notes || "",
    name: workout.name,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSave() {
    updateUserWorkout(workout._id, formData);
    toast.success("Workout Updated!");
    setIsEdit(false);
  }

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {isEdit ? (
            <input
              value={formData.name}
              onChange={handleChange}
              className="border p-1 rounded dark:bg-gray-700 dark:text-gray-300"
              name="name"
              type="text"
            />
          ) : (
            workout.name
          )}
        </h2>
        <div className="flex space-x-3">
          <Link href={``}>
            <button
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 p-2"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              <Edit size={20} />
            </button>
          </Link>
          <form action={onDelete}>
            <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 p-2">
              <Trash2 size={20} />
            </button>
          </form>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        <span className="font-medium">Date:</span>{" "}
        {isEdit ? (
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-1 rounded dark:bg-gray-700 dark:text-gray-300"
          />
        ) : (
          new Intl.DateTimeFormat("en-GB").format(new Date(workout.date))
        )}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
        <span className="font-medium">Duration:</span>{" "}
        {isEdit ? (
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-1 rounded dark:bg-gray-700 dark:text-gray-300"
          />
        ) : (
          `${workout.duration} min`
        )}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
        <span className="font-medium">Workout Type:</span>{" "}
        {workout.workoutType
          .replace("-", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </p>
      {/* Exercises List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Exercises
        </h3>
        <div className="space-y-3">
          {workout.exercises.map((exercise, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
            >
              <span className="text-gray-900 dark:text-gray-100">
                {exercise.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {exercise.sets} x {exercise.reps} ({exercise.weight} kg)
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Workout Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border flex items-center gap-2">
          <Flame size={20} className="text-red-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Calories Burned
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {workout.caloriesBurnt} kcal
            </p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border flex items-center gap-2">
          <Heart size={20} className="text-red-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg Heart Rate
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {workout.avgHeartRate} bpm
            </p>
          </div>
        </div>
      </div>
      {/* Notes */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
          <Edit2 size={18} className="mr-2 text-gray-500 dark:text-gray-300" />
          Notes
        </h3>
        {isEdit ? (
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded resize-none dark:bg-gray-700 dark:text-gray-300"
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            {workout.notes ? workout.notes : "Click edit icon to add notes"}
          </p>
        )}
      </div>
      {isEdit && (
        <div className="mt-4 flex justify-center ">
          <button
            onClick={handleSave}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
