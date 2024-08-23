import React from "react";

type PaginationProps = {
  totalTasks: number;
  tasksPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalTasks,
  tasksPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
