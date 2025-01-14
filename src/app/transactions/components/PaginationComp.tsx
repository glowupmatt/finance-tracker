import React, { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  transactionPages: number | undefined;
  onPageChange: (page: number) => void;
};

const PaginationComp = (props: Props) => {
  const { transactionPages, onPageChange } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  if (!transactionPages) return null;

  return (
    <Pagination className="p-2 lg:p-4">
      <PaginationContent className="lg:gap-4">
        <PaginationItem>
          <PaginationPrevious
            className="text-[.6rem]"
            href="#"
            onClick={() =>
              handlePageClick(currentPage > 1 ? currentPage - 1 : 1)
            }
          />
        </PaginationItem>
        {[...Array(transactionPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="text-[.6rem]"
              href="#"
              isActive={currentPage === index + 1}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className="text-[.6rem]"
            href="#"
            onClick={() =>
              handlePageClick(
                currentPage < transactionPages
                  ? currentPage + 1
                  : transactionPages
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
