"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const prevNextLinkClassName =
  "inline-block rounded-lg border-2 border-[#0b5ed7] px-4 py-2 text-[#0b5ed7]";

const pageLinkClassName =
  "inline-block rounded-lg border-2 border-[#0b5ed7] px-3 py-2 text-[#0b5ed7]";

const SCROLL_DURATION_MS = 800;

function scrollToTopThenNavigate(navigate: () => void): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(navigate, SCROLL_DURATION_MS);
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps): React.ReactElement | null {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function navigateToPage(page: number): void {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    scrollToTopThenNavigate(() => {
      router.push(href);
    });
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex justify-center">
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={({ selected }) => navigateToPage(selected + 1)}
        previousLabel="Previous"
        nextLabel="Next"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="…"
        renderOnZeroPageCount={null}
        hrefBuilder={() => "#"}
        containerClassName="flex list-none items-center justify-center gap-2"
        pageLinkClassName={pageLinkClassName}
        activeLinkClassName="!border-[#0b5ed7] bg-[#0b5ed7] text-white"
        previousLinkClassName={prevNextLinkClassName}
        nextLinkClassName={prevNextLinkClassName}
        disabledLinkClassName="cursor-not-allowed opacity-40"
        breakLinkClassName="inline-block px-2 py-2 text-[#212529]"
      />
    </nav>
  );
}
