import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-3">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
