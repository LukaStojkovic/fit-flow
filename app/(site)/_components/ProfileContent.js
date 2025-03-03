import Avatar from "./Avatar";
import UserForm from "./UserForm";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function ProfileContent() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <Spinner />;

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Avatar user={currentUser} />
        <div>
          <h2 className="text-2xl font-semibold">{currentUser?.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currentUser?.email}
          </p>
        </div>
      </div>
      <UserForm currentUser={currentUser} />
    </>
  );
}
