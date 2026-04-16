/**
 * Auth utility for managing session storage and authentication state
 */

export const setToken = (token) => {
  sessionStorage.setItem('jwtToken', token); // Requirement 3
};

export const getToken = () => {
  return sessionStorage.getItem('jwtToken');
};

export const removeToken = () => {
  sessionStorage.removeItem('jwtToken'); // Requirement 5
};

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null && token !== undefined && token !== '';
};
