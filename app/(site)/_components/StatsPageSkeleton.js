export default function SkeletonStatsPage() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg p-4 flex items-center space-x-4"
          >
            <div className="h-12 w-12 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
              <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="h-72 bg-gray-300 dark:bg-gray-800 rounded-lg p-6"
          >
            <div className="h-6 bg-gray-400 dark:bg-gray-700 rounded w-32 mb-4"></div>
            <div className="h-48 bg-gray-400 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
