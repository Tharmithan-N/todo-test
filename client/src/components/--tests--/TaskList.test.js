import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';
import userEvent from '@testing-library/user-event';

jest.mock('./TaskCard', () => ({ task, onTaskCompleted }) => (
  <div data-testid="task-card" onClick={() => onTaskCompleted(task.id)}>
    {task.title}
  </div>
));

describe('TaskList Component', () => {
  test('renders task list with tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    render(<TaskList tasks={tasks} onTaskCompleted={jest.fn()} />);
    
    expect(screen.getByText('Todo Tasks')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('renders message when no tasks are available', () => {
    render(<TaskList tasks={[]} onTaskCompleted={jest.fn()} />);
    expect(screen.getByText('No tasks found.')).toBeInTheDocument();
  });

  test('calls onTaskCompleted when a task is clicked', async () => {
    const tasks = [{ id: 1, title: 'Task 1' }];
    const onTaskCompleted = jest.fn();
    
    render(<TaskList tasks={tasks} onTaskCompleted={onTaskCompleted} />);
    
    const taskCard = screen.getByTestId('task-card');
    await userEvent.click(taskCard);
    
    expect(onTaskCompleted).toHaveBeenCalledWith(1);
  });
});
