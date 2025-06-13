import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const RouteProtect = ({ children, allowedRoles = [], blockRoles = [], allowUnauthenticated = false }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  // Check if user is authenticated (skip this check if allowUnauthenticated is true)
  if (!isAuthenticated && !allowUnauthenticated) {
    return <Navigate to="/" replace />;
  }

  // Only check role-based restrictions if user is authenticated
  if (isAuthenticated) {
    // Check if user role is blocked from accessing this route
    if (blockRoles.length > 0 && blockRoles.includes(userRole)) {
      // Redirect blocked users to their appropriate dashboard
      switch (userRole) {
        case 'admin':
          return <Navigate to="/dashboard" replace />;
        case 'staff':
          return <Navigate to="/staff/order-management" replace />;
        case 'rider':
          return <Navigate to="/rider/order-management" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }

    // Check if user has the required role (for role-specific routes)
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      // Redirect based on user role
      switch (userRole) {
        case 'admin':
          return <Navigate to="/dashboard" replace />;
        case 'staff':
          return <Navigate to="/staff/order-management" replace />;
        case 'rider':
          return <Navigate to="/rider/order-management" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  return children;
};

export default RouteProtect;