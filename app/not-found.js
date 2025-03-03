import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-96 p-8 bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Oops! Page not found.
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
          It looks like the page you're looking for doesn't exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
