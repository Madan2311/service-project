import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskUpdateForm from './components/TaskUpdateForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/create-task" element={<TaskForm />} />
                <Route path="/update-task" element={<TaskUpdateForm />} />
            </Routes>
        </Router> 
    );
};

export default App;
