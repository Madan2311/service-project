import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { taskService } from '../axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskUpdateForm = () => {
    const task = useLocation();
    const [title, setTitle] = useState(task?.state?.title || '');
    const [description, setDescription] = useState(task?.state?.description || '');
    const [completed, setCompleted] = useState(task?.state?.completed || false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title, description, completed };
        try {
            await taskService.put(`/${task.state._id}`, data, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
            navigate('/tasks');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {'Modificar Tarea'}
                </Typography>
            </Box>

            <TextField 
                label="Título" 
                fullWidth 
                margin="normal" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                sx={{ mb: 2 }}
            />

            <TextField 
                label="Descripción" 
                fullWidth 
                margin="normal" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                sx={{ mb: 2 }}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        color="primary"
                    />
                }
                label="Completado"
                sx={{ mb: 2 }}
            />

            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleSubmit} 
                sx={{ mb: 2 }}
            >
                {'Modificar Tarea'}
            </Button>

            <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth 
                sx={{ mt: 1 }}
                onClick={() => navigate('/tasks')}
            >
                Atrás
            </Button>
        </Container>
    );
};

export default TaskUpdateForm;
