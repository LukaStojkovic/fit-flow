"use client";

import { CreateWorkout } from "@/app/lib/actions";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function CreateWorkoutForm({ currentUser, setIsOpenModal }) {
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  async function submitForm(formData) {
    await CreateWorkout(currentUser._id, formData);

    setIsOpenModal(false);
  }

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Workout Name
        </label>
        <input
          type="text"
          placeholder="Enter workout name"
          className="px-4 py-2 rounded-lg border text-black bg-white border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition"
          {...register("name", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Workout Type
        </label>

        <select
          {...register("workoutType", { required: true })}
          className="px-4 py-2 rounded-lg border border-gray-300 text-black bg-white dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition"
        >
          <option value="">Select Workout</option>
          <option value="push-day">Push Day</option>
          <option value="pull-day">Pull Day</option>
          <option value="leg-day">Leg Day</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Duration (mins)
        </label>
        <input
          type="number"
          placeholder="Enter duration"
          className="px-4 py-2 rounded-lg text-black border bg-white border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition"
          {...register("duration", {
            required: true,
            valueAsNumber: true,
          })}
          min={1}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="datetime-local"
          className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition"
          {...register("date", { required: true, valueAsDate: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Exercises
        </label>

        <div className="flex flex-col max-h-[300px] overflow-y-auto">
          {fields
            .slice(0, expanded ? fields.length : 1)
            .map((exercise, index) => (
              <div
                key={exercise.id}
                className="border p-3 rounded-lg mb-2 dark:bg-gray-800"
              >
                <input
                  type="text"
                  placeholder="Exercise Name"
                  className="w-full text-black bg-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition mb-2"
                  {...register(`exercises.${index}.name`, {
                    required: true,
                  })}
                />

                <div className="flex flex-row gap-2 justify-between">
                  <input
                    type="number"
                    placeholder="Sets"
                    className="px-4 bg-white text-black py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition w-[6rem]"
                    {...register(`exercises.${index}.sets`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    min={1}
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition w-[6rem]"
                    {...register(`exercises.${index}.reps`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    min={1}
                  />
                  <input
                    type="number"
                    placeholder="Weight"
                    className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 dark:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-500 outline-none transition w-[6rem]"
                    {...register(`exercises.${index}.weight`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    min={1}
                  />
                </div>

                <button
                  type="button"
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all"
                  onClick={() => remove(index)}
                >
                  <Trash size={16} className="inline-block mr-1" />
                  Remove Exercise
                </button>
              </div>
            ))}
        </div>

        {fields.length > 1 && (
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 flex items-center justify-center mt-2"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? " Show Less" : " Show More"}
          </button>
        )}
        <button
          onClick={() => append({ name: "", sets: 0, reps: 0, weight: 0 })}
          type="button"
          className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Add new Exercise
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-all"
      >
        Create Workout
      </button>
    </form>
  );
}
