import React from "react";

type PaginationProps = {
  totalTasks: number;
  tasksPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTasksPerPageChange: (tasksPerPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalTasks,
  tasksPerPage,
  currentPage,
  onPageChange,
  onTasksPerPageChange,
}) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  // Fixed values for tasks per page options
  const tasksPerPageOptions = [5, 10, 20];

  return (
    <div className="pagination">
      {/* Pagination Buttons */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Select Box for Tasks Per Page */}
      <select
        value={tasksPerPage}
        onChange={(e) => onTasksPerPageChange(Number(e.target.value))}
        className="custom-select"
      >
        {tasksPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option} tasks per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;