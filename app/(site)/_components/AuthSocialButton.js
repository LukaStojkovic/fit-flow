export function AuthSocialButton({ icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-gray-500 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-offset-0"
    >
      {Icon && <Icon className="h-5 w-5" />}
    </button>
  );
}
