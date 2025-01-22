import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { taskService } from '../axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const data = { title, description, completed, userId };
        try {
            await taskService.post('/create-task', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            navigate('/tasks');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <TextField 
                label="Título" 
                fullWidth 
                margin="normal" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <TextField 
                label="Descripción" 
                fullWidth 
                margin="normal" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                {'Crear Tarea'}
            </Button>
            
            <Button variant="contained" color="primary" style={{ marginTop: '5px' }} fullWidth onClick={() => navigate('/tasks')}>
                {'Atrás'}
            </Button>
        </Container>
    );
};

export default TaskForm;
