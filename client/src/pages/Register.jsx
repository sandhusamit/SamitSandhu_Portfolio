import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "user", // default role //requires more security considerations in real apps
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
 /* 
// 
Developer Notes: (tasks for future improvements)
/--------------------------------------------------------------------------------------------------------------

This function needs to be contained inside authcontext, as well as others. All authnetication api calls should be in one place.
*/  


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      const response = await registerUser(formData);

      if (response.ok) {
        const data = await response.json();

        alert("Register successful!");

        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: ""
        });

        window.location.href = "/";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  return (
<section className="register-container">
  <h2 className="register-title">Register</h2>

  <form className="register-form" onSubmit={handleSubmit}>
    <div style={{ marginBottom: "1rem" }}>
      <label>First Name</label>
      <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label>Last Name</label>
      <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label>Username</label>
      <input id="username" name="username" value={formData.username} onChange={handleChange} required />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label>Email</label>
      <input id="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label>Password</label>
      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
    </div>

    <button className="register-btn" type="submit">Register</button>
  </form>
</section>

  );
}
