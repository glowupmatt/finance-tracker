"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useTransactions } from "@/context/TransactionsContext";

type Props = {
  transactionPages: number | undefined;
  onPageChange: (page: number) => void;
};

const PaginationComp = (props: Props) => {
  const { transactionPages, onPageChange } = props;
  const { setPage, page, maxPages, totalPages } = useTransactions();

  const handlePageClick = (page: number) => {
    setPage(page);
    onPageChange(page);
  };

  if (!transactionPages) return null;

  return (
    <Pagination className="p-2 lg:p-4">
      <PaginationContent className="lg:gap-4">
        <PaginationItem>
          {page > 1 && (
            <PaginationPrevious
              className="text-[.6rem]"
              href="#"
              onClick={() => handlePageClick(page > 1 ? page - 1 : 1)}
            />
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="text-[.6rem] hidden md:block"
            href="#"
            isActive={page === 1}
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {page > 2 && (
          <PaginationItem className=" hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 1 && page < maxPages && (
          <PaginationItem className=" hidden md:block">
            <PaginationLink
              className="text-[.6rem]"
              href="#"
              isActive={true}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < maxPages - 1 && (
          <PaginationItem className=" hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="text-[.6rem] hidden md:block"
            href="#"
            isActive={page === maxPages}
            onClick={() => handlePageClick(maxPages)}
          >
            {maxPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          {page < totalPages && (
            <PaginationNext
              className="text-[.6rem]"
              href="#"
              onClick={() =>
                handlePageClick(page < maxPages ? page + 1 : maxPages)
              }
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
