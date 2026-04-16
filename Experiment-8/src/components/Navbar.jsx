import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Requirement 5: Remove token from sessionStorage
    removeToken();
    // Requirement 5: Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: '#1a237e' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          AuthApp
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
