import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  CircularProgress
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import apiService from '../services/apiService';
import { setToken } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      // Call POST /login API
      const data = await apiService.login(username, password);
      
      // Store JWT token in sessionStorage
      if (data.token) {
        setToken(data.token);
        // Requirement 3: Redirect to /dashboard on success
        navigate('/dashboard');
      } else {
        setError('Token not received from server');
      }
    } catch (err) {
      // Requirement: Error handling for failed login
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to access your dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
            disabled={loading}
            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
