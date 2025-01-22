const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
});

taskSchema.pre('save', function(next) {
    if (!this.userId) {
        this.userId = uuidv4();
    }
    next();
});

module.exports = mongoose.model('Task', taskSchema);
