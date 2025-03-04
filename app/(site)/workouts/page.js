import WorkoutsContent from "../_components/WorkoutsContent";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Workouts",
  description: "Fit Flow",
};

export default async function Page({ searchParams }) {
  const { workoutType } = await searchParams;

  const filter = workoutType ?? "all";

  return (
    <div className="flex h-full">
      <main className="mx-4 sm:mx-8 md:mx-16 lg:mx-64 w-full p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
          Workouts
        </h1>

        <Suspense fallback={<Spinner />}>
          <WorkoutsContent filter={filter} />
        </Suspense>

        {/* {!workouts.length && (
          <InfoMessageBox
            label="No workouts found."
            message="Start your fitness journey by creating your first workout!" 
          />
        )} */}
      </main>
    </div>
  );
}
