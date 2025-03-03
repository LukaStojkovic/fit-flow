import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("workoutType") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set("workoutType", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All
      </FilterButton>
      <FilterButton
        filter="push"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Push
      </FilterButton>
      <FilterButton
        filter="pull"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Pull
      </FilterButton>
      <FilterButton
        filter="legs"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Legs
      </FilterButton>
    </div>
  );
}

function FilterButton({ children, handleFilter, activeFilter, filter }) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium 
                  bg-gray-200 text-gray-900 hover:bg-gray-300 
                  dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 
                  transition duration-200 
                  ${
                    filter === activeFilter
                      ? "bg-primary-600 text-black ring-2 ring-[#9DC0FA] dark:bg-[#374151] dark:ring-[#2A5192]"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
