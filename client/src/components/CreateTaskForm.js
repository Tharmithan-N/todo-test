// src/components/CreateTaskForm.js
import React, { useState } from 'react';

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((newTask) => {
        onTaskCreated(newTask); // Pass the new task to the parent
        setTitle('');
        setDescription('');
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="border p-2 w-full rounded"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
