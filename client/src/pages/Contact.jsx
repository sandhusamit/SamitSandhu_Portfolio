import { set } from "mongoose";
import { useState } from "react"; 
import { useAuth } from '../contexts/AuthContext';

export default function Contact() {

  const { newContact } = useAuth();
  const { newMessage } = useAuth();
  // State for contact data
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    poc: "Website",
  });

  const handleChange = (e) => {
    setContactData({ 
      ...contactData, 
      [e.target.name]: e.target.value 
    });
  };
  // State for message data
  const [messageData, setMessageData] = useState({
    contactID: "",
    message: "",
    service: "",
  });

  const handleMsgChange = (e) => {
    setMessageData({ 
      ...messageData, 
      [e.target.name]: e.target.value 
    });
  };
  

  //Submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1️⃣ Create contact
      const contactResult = await newContact(contactData);
      console.log("Created contact:", contactResult);
  
      if (!contactResult || !contactResult._id) {
        alert("Failed to create contact.");
        return;
      }
  
      // 2️⃣ Prepare message data with the new contactID
      const msgPayload = {
        contactID: contactResult._id,
        message: messageData.message,
        service: messageData.service
      };
  
      // 3️⃣ Send message
      const contactMsg = await newMessage(msgPayload);
  

  
      alert("Message sent successfully!");
  
      // Optionally reset form
      setContactData({ firstName: "", lastName: "", email: "", poc: "Website" });
      setMessageData({ contactID: "", message: "", service: "" });
  
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };
  
  
    


  return (
    <section style={{ margin: "2rem auto", padding: "1rem", maxWidth: "1200px" }}>
      <h2 style={{ color: "#0077ff",marginTop:"15.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
        Contact Me
      </h2>

      <div 
        style={{ 
          display: "flex", 
          alignItems: "flex-start", 
          justifyContent: "center", 
          gap: "2rem", 
          width: "100%" 
        }}
      >


        <form 
          onSubmit={handleSubmit} 
          style={{ flex: 1, maxWidth: "500px" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="firstName">First Name</label><br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contactData.firstName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="lastName">Last Name</label><br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contactData.lastName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="topic">Service</label><br />
              <select
                id="service"
                name="service"
                value={messageData.service}
                onChange={handleMsgChange}
                style={{ width: "100%", padding: "0.5rem" }}
              >
                <option value="">-- Select a Service --</option>
                <option value="mortgage">Mortgage</option>
                <option value="real-estate">Real Estate</option>
                <option value="techsolutions">Tech Solutions</option>
                {/* <option value="other">Other</option> */}
              </select>
            </div>


          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="message">Message</label><br />
            <textarea
              id="message"
              name="message"
              rows="5"
              value={messageData.message}
              onChange={handleMsgChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            ></textarea>
          </div>

          <button 
            type="submit" 
            style={{
              padding: "0.7rem 1.5rem",
              backgroundColor: "#0077ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
};
