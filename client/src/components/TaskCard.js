// src/components/TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
  const handleComplete = () => {
    fetch(`http://localhost:5000/tasks/${task.id}/complete`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => window.location.reload()) // Reload after marking as completed
      .catch((error) => console.error('Error marking task as completed:', error));
  };

  return (
    <div className="task-card bg-white shadow-md p-4 rounded-lg mb-4">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-4">
        <button
          onClick={handleComplete}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
