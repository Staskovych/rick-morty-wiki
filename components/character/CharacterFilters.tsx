"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  param: "status" | "species" | "gender";
  options: FilterOption[];
}

const FILTER_SECTIONS: FilterSection[] = [
  {
    title: "Status",
    param: "status",
    options: [
      { label: "Alive", value: "alive" },
      { label: "Dead", value: "dead" },
      { label: "Unknown", value: "unknown" },
    ],
  },
  {
    title: "Species",
    param: "species",
    options: [
      { label: "Human", value: "human" },
      { label: "Alien", value: "alien" },
      { label: "Humanoid", value: "humanoid" },
      { label: "Animal", value: "animal" },
      { label: "Robot", value: "robot" },
      { label: "Unknown", value: "unknown" },
    ],
  },
  {
    title: "Gender",
    param: "gender",
    options: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
      { label: "Genderless", value: "genderless" },
      { label: "Unknown", value: "unknown" },
    ],
  },
];

function getButtonClasses(isActive: boolean): string {
  const base =
    "rounded-lg px-3 py-1.5 text-sm border-2 border-[#0b5ed7]";
  return isActive
    ? `${base} bg-[#0b5ed7] text-white`
    : `${base} text-[#0b5ed7]`;
}

export default function CharacterFilters(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(param: FilterSection["param"], value: string): void {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(param);

    if (current === value) {
      params.delete(param);
    } else {
      params.set(param, value);
    }

    params.delete("page");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function clearFilters(): void {
    router.push(pathname);
  }

  return (
    <div className="w-[280px] shrink-0">
      <h2 className="mb-4 text-center font-bold text-[#212529]">Filters</h2>
      <button
        type="button"
        onClick={clearFilters}
        className="mb-4 block w-full text-center text-[#0b5ed7]"
      >
        Clear Filters
      </button>
      <div className="flex flex-col gap-4">
        {FILTER_SECTIONS.map(({ title, param, options }) => (
          <details key={param} open className="group">
            <summary className="cursor-pointer font-medium text-[#212529]">
              {title}
            </summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map(({ label, value }) => {
                const isActive = searchParams.get(param) === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateFilter(param, value)}
                    className={getButtonClasses(isActive)}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
