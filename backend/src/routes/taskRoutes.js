// src/routes/taskRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, completeTask } = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

const router = express.Router();

router.get('/tasks', getTasks);

router.post('/tasks', 
  // Validation middleware
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  validateTask, // Middleware to handle validation results
  createTask
);

router.put('/tasks/:id/complete', completeTask);

module.exports = router;
