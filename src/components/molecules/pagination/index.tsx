"use client";
import { useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginateProps = {
  total: number;
  page: number;
  baseUrl: string;
};

const Paginate = ({ total, page, baseUrl }: PaginateProps) => {
  const path = usePathname();
  const params = useSearchParams();

  const getQuery = useCallback((page: number) => {
    const query = new URLSearchParams(`${params.toString()}`);
    query.set("page", page.toString());
    return `${path}?${query.toString()}`;
  }, []);

  const prev = useMemo(() => {
    if (page === 1) {
      return null;
    }
    return getQuery(page - 1);
  }, [getQuery, page]);

  const next = useMemo(() => {
    if (page === total) {
      return null;
    }
    return getQuery(page + 1);
  }, [getQuery, page, total]);

  const last = useMemo(() => {
    return getQuery(total);
  }, [getQuery, total]);

  const first = useMemo(() => {
    return getQuery(1);
  }, [getQuery]);

  return (
    <Pagination>
      <PaginationContent>
        {page > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={first}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {prev && (
          <PaginationItem>
            <PaginationLink href={prev}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationLink href={next}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 1 < total && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={last}>{total}</PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
