import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskCompleted }) => {
  return (
    <div className="task-list">
      <h2 className="text-xl font-bold mb-4">Todo Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskCompleted={onTaskCompleted} />
        ))
      ) : (
        <div className='text-gray-600 text-center'>No tasks found.</div>
      )}
    </div>
  );
};

export default TaskList;
