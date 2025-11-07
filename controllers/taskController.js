
const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const { successResponse, errorResponse } = require('../utils/response');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status: status || 'pending',
      dueDate: dueDate || null,
    });

    return successResponse(res, 'Task created successfully', { task }, 201);
  } catch (error) {
    return errorResponse(res, 'Task creation failed', 500, error.message);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const query = { user: req.user._id, archived: false };

    if (status) query.status = status;
    if (search) query.$text = { $search: search };

    const pageNum = parseInt(page, 10) || 1;
    const lim = Math.min(parseInt(limit, 10) || 10, 100);
    const skip = (pageNum - 1) * lim;

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(lim).lean(),
      Task.countDocuments(query),
    ]);

    return successResponse(res, 'Tasks fetched successfully', {
      tasks,
      total,
      page: pageNum,
      pages: Math.ceil(total / lim),
    });
  } catch (error) {
    return errorResponse(res, 'Failed to fetch tasks', 500, error.message);
  }
};


exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 'Invalid task ID', 400);

    const task = await Task.findOne({ _id: id, user: req.user._id, archived: false }).lean();
    if (!task) return errorResponse(res, 'Task not found', 404);

    return successResponse(res, 'Task fetched successfully', { task });
  } catch (error) {
    return errorResponse(res, 'Failed to fetch task', 500, error.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 'Invalid task ID', 400);

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id, archived: false },
      req.body,
      { new: true }
    );

    if (!task) return errorResponse(res, 'Task not found', 404);
    return successResponse(res, 'Task updated successfully', { task });
  } catch (error) {
    return errorResponse(res, 'Failed to update task', 500, error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 'Invalid task ID', 400);

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { archived: true },
      { new: true }
    );

    if (!task) return errorResponse(res, 'Task not found', 404);
    return successResponse(res, 'Task deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete task', 500, error.message);
  }
};
