import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const {
    isAdmin,
    adminGetUsers,
    getMessages,
    adminGetContacts,
    adminGetProjects,
    goToUsers,
    goToMessages,
    goToContacts,
    goToProjects,
    logoutUser,
  } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    projects: 0,
    contacts: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    (async () => {
      const users = await adminGetUsers();
      const msgs = await getMessages();
      const contacts = await adminGetContacts();
      const projects = await adminGetProjects();

      setStats({
        users: users?.length || 0,
        messages: msgs?.length || 0,
        projects: projects?.length || 0,
        contacts: contacts?.length || 0,
      });

      setLoading(false);
    })();
  }, [isAdmin]);

  if (!isAdmin) return <h1>You do not have clearance.</h1>;
  if (loading) return <h2>Booting Admin Console...</h2>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card"><h2>Users</h2><p>{stats.users}</p></div>
        <div className="dashboard-card"><h2>Messages</h2><p>{stats.messages}</p></div>
        <div className="dashboard-card"><h2>Projects</h2><p>{stats.projects}</p></div>
        <div className="dashboard-card"><h2>Contacts</h2><p>{stats.contacts}</p></div>
      </div>

      <div className="dashboard-actions">
        <button onClick={goToUsers}>Manage Users</button>
        <button onClick={goToContacts}>View Contacts</button>
        <button onClick={{}}>View Messages - coming soon</button>
        <button onClick={{}}>Manage Projects - coming soon</button>
      </div>
    </div>
  );
}
