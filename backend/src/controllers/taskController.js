// src/controllers/taskController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { completed: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
      const task = await prisma.task.create({
        data: {
          title,
          description: description || '',  // Set an empty string if description is not provided
        },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);  // Log the full error
      res.status(500).json({ error: 'Failed to create task', details: error.message });
    }
  };

const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: true },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark task as completed' });
  }
};

module.exports = { getTasks, createTask, completeTask };
