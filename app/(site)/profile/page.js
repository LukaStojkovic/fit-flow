import { Suspense } from "react";
import ProfileContent from "../_components/ProfileContent";
import SkeletonUserForm from "../_components/SkeletonUserForm";

export const metadata = {
  title: "Profile",
  description: "Fit Flow",
};

export default function Page() {
  return (
    <div className="flex h-full text-gray-900 dark:text-white">
      <main className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
          Profile
        </h1>
        <Suspense fallback={<SkeletonUserForm />}>
          <ProfileContent />
        </Suspense>
      </main>
    </div>
  );
}
