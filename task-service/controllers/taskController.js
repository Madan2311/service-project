const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const task = await Task.create({ ...req.body });
    res.status(201).json(task);
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
};

const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(task);
};

const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Tarea eliminada correctamente!' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
