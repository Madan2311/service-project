const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-task', verifyToken, createTask);
router.get('/list', verifyToken, getTasks);
router.put('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

module.exports = router;
