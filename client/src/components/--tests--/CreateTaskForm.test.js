import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTaskForm from '../CreateTaskForm'; // Adjust the path if needed

// Mock global fetch API
global.fetch = jest.fn();

describe('CreateTaskForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders form inputs and button', () => {
    render(<CreateTaskForm onTaskCreated={jest.fn()} />);
    
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('shows an alert if fields are empty on submit', () => {
    render(<CreateTaskForm onTaskCreated={jest.fn()} />);

    window.alert = jest.fn(); // Mock alert

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(window.alert).toHaveBeenCalledWith('Please fill in both fields');
  });

  test('calls API and resets form on successful task creation', async () => {
    const mockTask = { id: 1, title: 'Test Task', description: 'Test Description' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockTask),
    });

    const mockOnTaskCreated = jest.fn();
    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: mockTask.title } });
    fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: mockTask.description } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/tasks', expect.objectContaining({ method: 'POST' }));
      expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
      expect(screen.getByPlaceholderText('Task Title')).toHaveValue('');
      expect(screen.getByPlaceholderText('Task Description')).toHaveValue('');
    });
  });

  test('handles API errors gracefully', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    window.alert = jest.fn();

    render(<CreateTaskForm onTaskCreated={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: 'Description' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to create task. Please try again later.');
    });
  });
});
