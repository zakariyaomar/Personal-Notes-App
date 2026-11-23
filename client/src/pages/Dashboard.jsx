import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";
import { clearToken } from "../api/token";

// Placeholder dashboard for Friday's scope, just enough to prove the full
// register -> login -> authenticated request flow works end to end. The
// notes CRUD UI is built out as part of Saturday's milestones.
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data.user))
      .catch(() => {
        clearToken();
        navigate("/login");
      });
  }, [navigate]);

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-form" style={{ textAlign: "center" }}>
        <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        <p>{user?.email}</p>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
