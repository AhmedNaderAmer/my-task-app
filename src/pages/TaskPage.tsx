import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';

type Task = {
  id: number;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Finished';
};

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const tasksPerPage = 4;

  useEffect(() => {
    const cachedTasks = localStorage.getItem('tasks');
    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdateTask = (task: Task) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleResetFilters = () => {
    setFilterText('');
    setStatusFilter('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  // Filter tasks by description and status
  const filteredTasks = tasks.filter((task) => {
    const matchesDescription = task.description.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesDescription && matchesStatus;
  });

  // Sort tasks by description
  const sortedTasks = filteredTasks.sort((a, b) => {
    const comparison = a.description.localeCompare(b.description);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="task-page">
      <h1>Task Manager</h1>
      <TaskForm
        onSave={handleAddOrUpdateTask}
        onCancel={() => setEditingTask(null)}
        task={editingTask}
      />

      {/* Filter and Sort Controls */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Filter by description"
          value={filterText}
          onChange={handleFilterChange}
        />
        <select className="custom-select" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
        <select className="custom-select" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
        <button className="button" onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <TaskList
        tasks={currentTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Pagination
        totalTasks={sortedTasks.length}
        tasksPerPage={tasksPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskPage;