import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const RouteProtect = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
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

  return children;
};

export default RouteProtect;