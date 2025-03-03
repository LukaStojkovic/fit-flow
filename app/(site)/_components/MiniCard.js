export default function MiniCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
      {icon}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {label}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{value}</p>
      </div>
    </div>
  );
}
