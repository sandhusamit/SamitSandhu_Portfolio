import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
/*
  Login component allows users to log into their accounts.
  It uses the useAuth hook to access the loginUser function from AuthContext.
  The component maintains local state for email and password inputs.
  On form submission, it calls loginUser with the entered credentials.
*/
export default function login() {
  const { loginUser } = useAuth(); // calling useAuth to get loginUser function

  // Local state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      username
    };
// call loginUser from AuthContext - service call to backend
    await loginUser(user);
  };
  return (
    <section style={{marginTop:"10rem"}} className="login-wrapper">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="login-input"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="login-input"
          id="email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="login-input"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </section>
  );
}
