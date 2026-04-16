import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * ProtectedRoute component - Guards routes that require authentication.
 * If the user is authenticated, it renders the child component.
 * Otherwise, it redirects to the login page.
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Requirement 4: Redirect to login if token is missing
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
