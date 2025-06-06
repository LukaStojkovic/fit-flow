"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import WorkoutItem from "./WorkoutItem";
import Modal from "./Modal";
import { Plus } from "lucide-react";
import CreateWorkoutForm from "./CreateWorkoutForm";
import Filters from "./Filters";
import InfoMessageBox from "./InfoMessageBox";
import Link from "next/link";
import { deleteWorkout } from "@/app/lib/actions";

export default function WorkoutList({ workouts, currentUser, filter }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optimisticWorkouts, setOptimisticWorkouts] = useOptimistic(workouts);

  let displayWorkouts;

  if (filter === "all") displayWorkouts = optimisticWorkouts;
  if (filter === "push")
    displayWorkouts = optimisticWorkouts.filter(
      (workout) => workout.workoutType === "push-day"
    );
  if (filter === "pull")
    displayWorkouts = optimisticWorkouts.filter(
      (workout) => workout.workoutType === "pull-day"
    );
  if (filter === "legs")
    displayWorkouts = optimisticWorkouts.filter(
      (workout) => workout.workoutType === "leg-day"
    );

  function handleOpenModal() {
    setIsOpenModal((prev) => !prev);
  }

  async function handleDeleteWorkout(workoutId) {
    startTransition(() => {
      setOptimisticWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutId)
      );
    });

    try {
      await deleteWorkout(workoutId);
    } catch (err) {
      console.error(err);
      setOptimisticWorkouts(workouts);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 pr-4">
        <Filters />
        {currentUser.weight ? (
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white 
                     rounded-full text-sm hover:bg-gray-800 transition-all 
                     dark:bg-gray-700 dark:hover:bg-gray-600 mt-4 sm:mt-0"
            onClick={handleOpenModal}
          >
            <Plus size={16} />
            <span>Create</span>
          </button>
        ) : (
          <Link
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white 
          rounded-full text-sm hover:bg-gray-800 transition-all 
          dark:bg-gray-700 dark:hover:bg-gray-600 mt-4 sm:mt-0"
            href="/profile"
          >
            <Plus size={16} />
            <span>Create first workout</span>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              {["Workout", "Date", "Duration", "Type", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-3 px-6 text-left font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {displayWorkouts?.map((workout) => (
              <WorkoutItem
                workout={workout}
                key={workout._id}
                onDelete={() => handleDeleteWorkout(workout._id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {!displayWorkouts.length && (
        <InfoMessageBox
          label="No workouts found."
          message="Start your fitness journey by creating your first workout!"
        />
      )}

      {isOpenModal && (
        <Modal onClose={handleOpenModal}>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Create New Workout
          </h1>
          <CreateWorkoutForm
            currentUser={currentUser}
            setIsOpenModal={setIsOpenModal}
          />
        </Modal>
      )}
    </div>
  );
}
