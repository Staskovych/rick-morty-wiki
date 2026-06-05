"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const DEBOUNCE_MS = 400;

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({
  defaultValue = "",
}: SearchBarProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);

  if (defaultValue !== prevDefaultValue) {
    setPrevDefaultValue(defaultValue);
    setQuery(defaultValue);
  }

  const updateSearchInUrl = useCallback(
    (searchValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const trimmed = searchValue.trim();
      if (trimmed) {
        params.set("name", trimmed);
      } else {
        params.delete("name");
      }
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const urlName = (searchParams.get("name") ?? "").trim();
    const trimmedQuery = query.trim();
    if (trimmedQuery === urlName) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      updateSearchInUrl(query);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query, searchParams, updateSearchInUrl]);

  return (
    <div className="mb-8 flex w-full justify-center">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search characters..."
        aria-label="Search characters"
        className="w-[480px] rounded-lg border-2 border-[#0b5ed7] px-[15px] py-[10px] text-[#212529]"
      />
    </div>
  );
}
