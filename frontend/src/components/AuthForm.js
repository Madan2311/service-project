import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, Alert } from '@mui/material';
import { userService } from '../axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = type === 'login' ? '/login' : '/register';
        try {
            const { data } = await userService.post(url, { username, password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                if (type !== 'login') {
                    setSuccessMessage('Usuario creado exitosamente!');
                    setTimeout(() => navigate('/tasks', { state: { ...data }}), 200);
                } else {
                    navigate('/tasks', { state: { ...data }});
                }
            }
        } catch (err) {
            setError('Credenciales no válidas o algo salió mal');
        }
    };

    const handleRedirectToRegister = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {type === 'login' ? 'Iniciar Sesión' : 'Crear una Cuenta'}
                    </Typography>

                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField 
                            label="Usuario" 
                            fullWidth 
                            margin="normal" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            variant="outlined"
                        />
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            fullWidth 
                            margin="normal" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            variant="outlined"
                        />
                        
                        {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}

                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            type="submit" 
                            disabled={!username || !password}
                            sx={{ mt: 2 }}
                        >
                            {type === 'login' ? 'Ingresar' : 'Registrarse'}
                        </Button>
                    </form>

                    {type === 'login' && (
                        <Button 
                            variant="text" 
                            color="primary" 
                            fullWidth 
                            onClick={handleRedirectToRegister}
                            sx={{ mt: 2, textTransform: 'none' }}
                        >
                            ¿No tienes una cuenta? Regístrate
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AuthForm;
