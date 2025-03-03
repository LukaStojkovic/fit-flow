import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteWorkout, getWorkoutById } from "@/app/lib/actions";
import { ArrowLeft } from "lucide-react";
import WorkoutDetails from "../../_components/WorkoutDetails";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { name } = await getWorkoutById(id);
  return { title: `Workout ${name}` };
}

export default async function Page({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  const currentUser = await getCurrentUser();

  async function handleDelete() {
    "use server";
    await deleteWorkout(id);
    redirect("/workouts");
  }

  if (!workout) return null;

  return (
    <div className="flex flex-col h-full items-center p-6">
      <div className="w-full max-w-3xl">
        <Link
          href="/workouts"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-all mb-4"
        >
          <ArrowLeft size={20} />
          <span className="ml-2 text-sm font-medium">Back to Workouts</span>
        </Link>
      </div>

      <WorkoutDetails
        workout={workout}
        onDelete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
}
