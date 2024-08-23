import React from "react";
import Task from "./Task";

type TaskType = {
  id: number;
  description: string;
  status: "Not Started" | "In Progress" | "Finished";
};

type TaskListProps = {
  tasks: TaskType[];
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
