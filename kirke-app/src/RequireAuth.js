import { useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  const auth = useAuth();

  console.log("auth = "+auth);
  console.log("auth = "+auth.user);

  return auth.user != null
    ? children
    : <Navigate to="/" replace />;
}

export default RequireAuth;