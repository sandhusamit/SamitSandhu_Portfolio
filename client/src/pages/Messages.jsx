import { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';

export default function Messages() {
  const { getMessages } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senderName, setSenderName] = useState({
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages();

        if (!data || data.hasError) {
          console.error("Failed to load messages:", data);
          setMessages([]);
          return;
        }

        setMessages(data); // store message array

        // Fetch sender info ONLY if we have messages
        if (data.length > 0) {
          const firstMsg = data[0];

          const contactRes = await fetch(
            `/api/contacts/${firstMsg.contactID}`,
            { headers: { "Content-Type": "application/json" } }
          );

          if (contactRes.ok) {
            const contactData = await contactRes.json();
            setSenderName({
              firstName: contactData.firstName,
              lastName: contactData.lastName
            });
          }
        }
      } catch (err) {
        console.error("Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [getMessages]);

  if (loading) return <p>Loading messages...</p>;

  return (
<section className="messages-container">
  <h2>Messages</h2>

  {loading ? (
    <p className="loading-msg">Loading messages…</p>
  ) : messages.length === 0 ? (
    <p className="no-messages">No messages yet.</p>
  ) : (
    <ul className="message-list">
      {messages.map((msg) => (
        <li key={msg._id} className="message-item">
          <strong>{senderName.firstName} {senderName.lastName}</strong>: {msg.message}
        </li>
      ))}
    </ul>
  )}
</section>

  );
}
