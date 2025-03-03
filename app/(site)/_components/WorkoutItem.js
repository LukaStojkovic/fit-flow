import { Eye, Trash2 } from "lucide-react";
import { deleteWorkout } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { workoutTypeIcons } from "@/app/constants/constants";

export default function WorkoutItem({ workout }) {
  const router = useRouter();

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(workout.date));

  function getEmojiForWorkoutType(type) {
    return workoutTypeIcons[type] || workoutTypeIcons["unknown"];
  }

  return (
    <tr
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => router.push(`/workouts/${workout._id}`)}
    >
      <td className="py-4 px-6 text-gray-800 dark:text-gray-300">
        {workout.name}
      </td>
      <td className="py-4 px-6 text-gray-800 dark:text-gray-300">
        {formattedDate}
      </td>
      <td className="py-4 px-6 text-gray-800 dark:text-gray-300">
        {workout.duration} min
      </td>
      <td className="py-4 px-6 text-gray-800 dark:text-gray-300">
        {getEmojiForWorkoutType(workout.workoutType)}
      </td>
      <td className="py-4 px-6 flex space-x-3">
        <button
          type="button"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          onClick={() => router.push(`/workouts/${workout._id}`)}
        >
          <Eye size={18} />
        </button>

        <form
          action={deleteWorkout.bind(null, workout._id)}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="submit"
            className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </form>
      </td>
    </tr>
  );
}
