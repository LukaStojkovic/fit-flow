export default function SkeletonUserForm() {
  return (
    <>
      <div className="flex items-center space-x-4 pb-4">
        <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-12 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600 animate-pulse">
        <div className="space-y-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    </>
  );
}
