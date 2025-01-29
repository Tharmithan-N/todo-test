const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();
app.use(express.json()); // To parse JSON request bodies

app.use(cors());

const port = process.env.PORT || 5000;

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { completed: false },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Route to mark a task as completed
app.put('/tasks/:id/complete', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
