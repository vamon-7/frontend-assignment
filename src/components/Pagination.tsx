import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/pagination.css';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (e: number) => {};
};

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: Props) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const prevCurr = useRef();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  useEffect(() => {
    prevCurr.current = currentPage;
    const count = currentPage - prevCount;

    if (currentPage == 5 && count > 0) {
      setEndIndex((prev) => prev + 2);
      setStartIndex((prev) => prev + 2);
      return;
    }

    if (currentPage <= totalPages && currentPage > totalPages - 2) {
      setStartIndex(totalPages - 5);
      setEndIndex(totalPages);
      return;
    }

    if (currentPage > 4) {
      if (count > 0) {
        setStartIndex((prev) => prev + count);
        setEndIndex((prev) => prev + count);
      } else {
        setStartIndex((prev) => prev - Math.abs(count));
        setEndIndex((prev) => prev - Math.abs(count));
      }
    } else {
      setEndIndex(5);
      setStartIndex(0);
    }
  }, [currentPage]);

  const prevCount = prevCurr.current;

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: Math.ceil(totalItems / 5) }, (_, i) => i + 1)
        .slice(startIndex, endIndex)
        .map((item, i) => (
          <button
            key={item}
            onClick={() => goToPage(item)}
            className={currentPage === item ? 'active' : ''}
          >
            {item}
          </button>
        ))}
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
