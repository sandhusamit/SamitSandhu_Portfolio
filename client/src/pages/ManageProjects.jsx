import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ManageProjects() {
  const {
    isAdmin,
    adminGetProjects,
    adminCreateProject,
    adminUpdateProject,
    adminDeleteProject,
  } = useAuth();

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    refreshProjects();
  }, [isAdmin]);

  const refreshProjects = async () => {
    const data = await adminGetProjects();
    setProjects(data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await adminUpdateProject(editingId, formData);
      setEditingId(null);
    } else {
      await adminCreateProject(formData);
    }

    setFormData({
      title: "",
      description: "",
      image: "",
    });

    refreshProjects();
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    await adminDeleteProject(id);
    refreshProjects();
  };

  if (!isAdmin)
    return (
      <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Access Denied
      </h1>
    );

  return (
    <div className="manage-projects-container">
      <h1 className="manage-projects-title">Manage Projects - Coming Soon!</h1>

      <form className="manage-projects-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL or Filename"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit" className="halo-btn-primary">
          {editingId ? "Update Project" : "Create Project"}
        </button>
      </form>

      <div className="manage-projects-list">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <div>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
              {project.image && <img src={project.image} alt={project.title} />}
            </div>
            <div className="project-actions">
              <button
                onClick={() => handleEdit(project)}
                className="halo-btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="halo-btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
