const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, userId: user._id });
};

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Authenticated', token, userId: user._id });
};

module.exports = { registerUser, authenticateUser };
