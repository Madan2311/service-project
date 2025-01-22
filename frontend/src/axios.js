import axios from 'axios';

export const userService = axios.create({
    baseURL: 'http://localhost:3001/users',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskService = axios.create({
    baseURL: 'http://localhost:3002/tasks',
    headers: {
        'Content-Type': 'application/json'
    }
});
