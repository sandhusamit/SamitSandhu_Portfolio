import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ManageUsers() {
  const {
    isAdmin,
    adminGetUsers,
    registerUser,
    adminUpdateUser,
    adminDeleteUser,
  } = useAuth();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    refreshUsers();
  }, [isAdmin]);

  const refreshUsers = async () => {
    const data = await adminGetUsers();
    setUsers(data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await adminUpdateUser(editingId, user, formData);
      setEditingId(null);
    } else {
      await registerUser(formData);
    }

    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "user",
    });

    refreshUsers();
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password, // don't prefill passwords - unless you'd like to obtain hashed pass and convert back
      role: user.role,
    });
    setEditingId(user._id);
    setUser(user);
  };

  const handleDelete = async (id) => {
    await adminDeleteUser(id);
    refreshUsers();
  };

  if (!isAdmin) return <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>Access Denied</h1>;

  return (
    <div className="manage-users-container">
      <h1 className="manage-users-title">Manage Users</h1>

      <form className="manage-users-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required={!editingId} // allow blank for edit
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="halo-btn-primary">
          {editingId ? "Update User" : "Create User"}
        </button>
        <button type="button" onClick={() => {
          setEditingId(null);
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            role: "user",
          });
        }} className="halo-btn-secondary">
          Clear Form
        </button>

      </form>

      <div className="manage-users-list">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div>
              <strong>{user.firstName} {user.lastName}</strong>{" "}
              <span>({user.username}, {user.email}) – {user.role}</span>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)} className="halo-btn-edit">Edit</button>
              <button onClick={() => handleDelete(user._id)} className="halo-btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
