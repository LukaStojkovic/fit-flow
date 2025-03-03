export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProfileContent from "../_components/ProfileContent";
import SkeletonUserForm from "../_components/SkeletonUserForm";

export const metadata = {
  title: "Profile",
  description: "Fit Flow",
};

export default function Page() {
  return (
    <div className="flex h-full  text-gray-900 dark:text-white">
      <main className="mx-64 w-full p-6">
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>
        {/* <Suspense fallback={<SkeletonUserForm />}> */}
        <ProfileContent />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
