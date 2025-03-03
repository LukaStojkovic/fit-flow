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
      <main className="mx-64 w-full p-6">
        <h1 className="text-3xl font-semibold mb-8">Workouts</h1>

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
