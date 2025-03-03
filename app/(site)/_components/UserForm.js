"use client";

import { useState } from "react";
import { User, Weight, Ruler, User2, Cake } from "lucide-react";
import { updateUserData } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function UserForm({ currentUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      weight: currentUser.weight || "",
      height: currentUser.height || "",
      gender: currentUser.gender || "",
      age: currentUser.age || "",
    },
  });

  async function onSubmit(data) {
    await updateUserData(currentUser._id, data);
    toast.success("Profile Updated!");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600"
    >
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <User className="mr-2 text-gray-600 dark:text-gray-400" size={16} />{" "}
          Name
        </label>
        <input
          type="text"
          name="name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 text-black bg-white focus:ring-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 25,
              message: "Name can't have more than 25 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Weight className="mr-2 text-gray-600 dark:text-gray-400" size={16} />{" "}
          Weight (kg)
        </label>
        <input
          type="number"
          name="weight"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 text-black bg-white focus:ring-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter your weight"
          {...register("weight", {
            required: "Weight is required",
            max: { value: 650, message: "Weight must be below 650" },
          })}
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Ruler className="mr-2 text-gray-600 dark:text-gray-400" size={16} />{" "}
          Height (cm)
        </label>
        <input
          type="number"
          name="height"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 text-black bg-white focus:ring-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter your height"
          {...register("height", {
            required: "Height is required",
            max: { value: 300, message: "Max height is 300" },
          })}
        />
        {errors.height && (
          <p className="text-red-500 text-sm">{errors.height.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Cake className="mr-2 text-gray-600 dark:text-gray-400" size={16} />{" "}
          Age
        </label>
        <input
          type="number"
          name="age"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 text-black bg-white focus:ring-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter your age"
          {...register("age", {
            required: "Age is required",
            max: { value: 99, message: "Age must be below 99" },
          })}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <User2 className="mr-2 text-gray-600 dark:text-gray-400" size={16} />{" "}
          Gender
        </label>
        <select
          name="gender"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 text-black bg-white focus:ring-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          {...register("gender", { required: true })}
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">Gender is required</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition-all dark:bg-blue-900 dark:hover:bg-blue-800"
      >
        Save Changes
      </button>
    </form>
  );
}
