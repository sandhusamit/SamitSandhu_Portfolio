import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ManageContacts() {
  const {
    isAdmin,
    adminGetContacts,
    adminCreateContact,
    adminUpdateContact,
    adminDeleteContact,
  } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    poc: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    refreshContacts();
  }, [isAdmin]);

  const refreshContacts = async () => {
    const data = await adminGetContacts();
    setContacts(data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await adminUpdateContact(editingId, formData);
      setEditingId(null);
    } else {
      await adminCreateContact(formData);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      poc: "",
    });

    refreshContacts();
  };

  const handleEdit = (contact) => {
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      poc: contact.poc,
    });
    setEditingId(contact._id);
  };

  const handleDelete = async (id) => {
    await adminDeleteContact(id);
    refreshContacts();
  };

  if (!isAdmin)
    return (
      <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Access Denied
      </h1>
    );

  return (
    <div className="manage-contacts-container">
      <h1 className="manage-contacts-title">Manage Contacts</h1>

      <form className="manage-contacts-form" onSubmit={handleSubmit}>
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="poc"
          placeholder="Point of Contact (POC)"
          value={formData.poc}
          onChange={handleChange}
        />
        <button type="submit" className="halo-btn-primary">
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div className="manage-contacts-list">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact._id}>
            <div>
              <strong>
                {contact.firstName} {contact.lastName}
              </strong>{" "}
              <span>({contact.email}) – POC: {contact.poc}</span>
            </div>
            <div className="contact-actions">
              <button
                onClick={() => handleEdit(contact)}
                className="halo-btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
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
