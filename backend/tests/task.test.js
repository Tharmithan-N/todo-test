// tests/task.test.js
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../src/server'); // Import the app for testing

// Mock PrismaClient to avoid hitting the real database
jest.mock('@prisma/client');

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
};

describe('Task API', () => {
  let prismaMock;

  beforeAll(() => {
    prismaMock = new PrismaClient();
    // Mock the methods on the task model
    prismaMock.task = {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore PrismaClient after tests
  });

  it('should return a list of tasks', async () => {
    // Mock PrismaClient's `findMany` method
    prismaMock.task.findMany.mockResolvedValue([mockTask]);

    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test Task');
  });

  it('should create a new task', async () => {
    // Mock PrismaClient's `create` method
    prismaMock.task.create.mockResolvedValue(mockTask);

    const response = await request(app).post('/tasks').send({
      title: 'New Task',
      description: 'New Task Description',
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  it('should mark a task as completed', async () => {
    const taskId = 1;

    // Mock PrismaClient's `update` method
    prismaMock.task.update.mockResolvedValue({
      ...mockTask,
      completed: true,
    });

    const response = await request(app).put(`/tasks/${taskId}/complete`);
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it('should return a 400 error if validation fails', async () => {
    const response = await request(app).post('/tasks').send({
      title: '', // Missing title should trigger validation error
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
  });
});
