import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TaskCard from '../TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task description.',
  };
  
  const mockOnTaskCompleted = jest.fn();

  test('should render task title and description', () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);
    
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
  });

  test('should show modal when "Mark as Done" button is clicked', () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);
    
    fireEvent.click(screen.getByText('Mark as Done'));
    
    expect(screen.getByText(`Are you sure you want to mark the task "${mockTask.title}" as completed?`)).toBeInTheDocument();
  });

  test('should call onTaskCompleted when task is marked as completed', async () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);
    
    fireEvent.click(screen.getByText('Mark as Done'));
    
    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(mockOnTaskCompleted).toHaveBeenCalledWith(mockTask.id);
    });
  });

  test('should not call onTaskCompleted when task completion is canceled', async () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);
    
    fireEvent.click(screen.getByText('Mark as Done'));
    
    fireEvent.click(screen.getByText('No'));

    await waitFor(() => {
      expect(mockOnTaskCompleted).not.toHaveBeenCalled();
    });
  });

  test('should display error message if there is an issue with the completion request', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);
    
    fireEvent.click(screen.getByText('Mark as Done'));
    
    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(screen.getByText('There was an issue completing the task. Please try again later.')).toBeInTheDocument();
    });
  });
});
