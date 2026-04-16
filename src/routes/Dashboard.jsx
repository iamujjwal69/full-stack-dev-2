import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress, 
  Alert,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import Navbar from '../components/Navbar';
import apiService from '../services/apiService';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // Requirement 4: Fetch data from GET /protected API
        const result = await apiService.getProtectedData();
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch protected data');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            User Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome! You are securely authenticated.
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Protected System Content
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {data?.message || 'Successfully retrieved protected content from the server.'}
                </Typography>
                
                <Box mt={4} p={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 1, borderLeft: '5px solid #1a237e' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Debug Info:
                  </Typography>
                  <Typography variant="caption" display="block">
                    Authorization Header: Bearer [TOKEN_ACTIVE]
                  </Typography>
                  <Typography variant="caption" display="block">
                    Session Status: Authenticated
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="secondary">
                    Your Profile
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" gutterBottom>
                    <strong>Status:</strong> Active
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Access Level:</strong> User
                  </Typography>
                  <Typography variant="body2">
                    <strong>Last Login:</strong> {new Date().toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
