import React from "react";

type TaskProps = {
  task: {
    id: number;
    description: string;
    status: "Not Started" | "In Progress" | "Finished";
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const statusColors: Record<string, string> = {
  "Not Started": "#f44336", // Red
  "In Progress": "#ff9800", // Orange
  Finished: "#4caf50", // Green
};

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div
      className="task-card"
      style={{ borderColor: statusColors[task.status] }}
    >
      <div className="task-header">
        <h4>{task.description}</h4>
        <span style={{ color: statusColors[task.status] }}>{task.status}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
