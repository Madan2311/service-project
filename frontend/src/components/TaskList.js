import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Box, Typography, Paper, IconButton } from '@mui/material';
import { taskService } from '../axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';

const TaskList = ({ }) => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const user = useLocation();

    useEffect(() => {
        const fetchTasks = async () => {
            const userId = user?.state?.userId || localStorage.getItem('userId');
            console.log("userId", user);
            const { data } = await taskService.get(`/list`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        await taskService.delete(`/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(tasks.filter((task) => task._id !== id));
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: '10px 20px', marginTop: '5px' }}
                    onClick={() => navigate('/login')}
                >
                    Cerrar Sesión
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: '10px 20px', marginTop: '5px' }}
                    onClick={() => navigate('/create-task')}
                >
                    Crear Tarea Nueva
                </Button>
            </Box>

            <List>
                {tasks.map((task) => (
                    <Paper key={task._id} sx={{ mb: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
                        <ListItem>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <ListItemText
                                        primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>}
                                        secondary={<Typography variant="body2" color="textSecondary">{task.description}</Typography>}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Completado: {task.completed ? 'Sí' : 'No'}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate("/update-task", { state: { ...task } })}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Box>
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Container>
    );
};

export default TaskList;
