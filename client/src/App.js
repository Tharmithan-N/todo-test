// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="App container mx-auto p-4">
      <CreateTaskForm onTaskCreated={handleTaskCreated} />
      <TaskList />
    </div>
  );
};

export default App;
