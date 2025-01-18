import React, { useState } from 'react';
import '../assets/css/pagination.css';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (e: number) => {};
};

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: Props) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: Math.ceil(totalItems / 5) }, (_, i) => i + 1).map(
        (item, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        )
      )}
      <button
        className="pagination-btn"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
