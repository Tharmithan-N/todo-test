import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Add new task to the list immediately
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Remove task from the list when marked as completed
  const handleTaskCompleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App container mx-auto p-4 h-screen">
      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Left Column (Fixed Height for Form) */}
        <div className="md:w-1/3 flex-shrink-0 bg-white p-4 shadow-md rounded-lg md:h-fit md:align-middle">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
        </div>

        {/* Right Column (Scrollable Task List) */}
        <div className="md:w-2/3 flex-grow overflow-y-auto max-h-screen bg-gray-50 p-4 shadow-md rounded-lg">
          <TaskList tasks={tasks} onTaskCompleted={handleTaskCompleted} />
        </div>
      </div>
    </div>
  );
};

export default App;
