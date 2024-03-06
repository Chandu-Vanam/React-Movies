import React from "react";

import "./custompagination.css";

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        {[...Array(numOfPages)].map((_, index) => (
          <div
            key={index + 1}
            className="page"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
