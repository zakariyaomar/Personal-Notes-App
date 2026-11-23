import { Navigate } from "react-router-dom";
import { getToken } from "../api/token";

// Minimal route guard for Friday's scope: redirects to /login when there's
// no stored token. Saturday's AuthContext will replace this with proper
// session-aware state (e.g. reacting to token expiry).
function ProtectedRoute({ children }) {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
