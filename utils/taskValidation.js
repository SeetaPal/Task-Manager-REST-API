const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  dueDate: Joi.date().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  dueDate: Joi.date().optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
