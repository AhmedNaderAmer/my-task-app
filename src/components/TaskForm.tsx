import React, { useEffect, useState } from "react";

type TaskFormProps = {
  task?: {
    id: number;
    description: string;
    status: "Not Started" | "In Progress" | "Finished";
  } | null;
  onSave: (task: {
    id: number;
    description: string;
    status: "Not Started" | "In Progress" | "Finished";
  }) => void;
  onCancel: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<
    "Not Started" | "In Progress" | "Finished"
  >(task?.status || "Not Started");

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setStatus(task.status);
    }else{
        setDescription("");
      setStatus("Not Started");
    }
  }, [task]);

  const handleSubmit = () => {
    if (description.trim()) {
      onSave({
        id: task ? task.id : Date.now(), // Generate ID for new tasks
        description,
        status,
      });
      setDescription("");
      setStatus("Not Started");
    }
  };

  console.log("test",task,onCancel);
  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Finished">Finished</option>
      </select>
      <button onClick={handleSubmit}>{task ? "Update" : "Add"}</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TaskForm;
