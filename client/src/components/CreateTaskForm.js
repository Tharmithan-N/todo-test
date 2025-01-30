
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const task = { title, description };
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      // alert(`Task "${newTask.title}" has been added successfully!`);
      toast.success(`Task "${newTask.title}" has been added successfully!`);
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      
      <label className="block mb-2 font-semibold">Task Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Task Title"
        maxLength={100}
        required
      />
      
      <label className="block mb-2 font-semibold">Task Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Task Description"
        maxLength={150}
        rows={4}
        required
      />
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Task'}
      </button>
      <ToastContainer />
    </form>
  );
};

export default CreateTaskForm;
