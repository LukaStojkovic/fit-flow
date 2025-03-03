export default function WelcomeMessageBox({ userData }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white rounded-xl p-6 shadow-lg">
      {userData.weight ? (
        <h1 className="text-3xl font-bold">
          👋 Welcome back, {userData.name}!
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">👋 Welcome, {userData.name}!</h1>
      )}
      <p className="mt-1 text-white/80 dark:text-gray-400">
        Stay consistent and crush your fitness goals! 🚀
      </p>
    </div>
  );
}
