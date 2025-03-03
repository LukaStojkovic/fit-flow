import getCurrentUser from "@/app/actions/getCurrentUser";
import WorkoutList from "./WorkoutList";
import { getUserWorkouts } from "@/app/lib/actions";

export default async function WorkoutsContent({ filter }) {
  const currentUser = await getCurrentUser();
  const workouts = await getUserWorkouts(currentUser._id);

  return (
    <WorkoutList
      filter={filter}
      workouts={workouts}
      currentUser={currentUser}
    />
  );
}
