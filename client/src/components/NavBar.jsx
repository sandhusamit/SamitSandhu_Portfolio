import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './globalStyle.css';

export default function NavBar() {
  const { isLoggedIn, logoutUser, isAdmin } = useAuth();

  return (
    <nav>
      {/* Logo */}
      <Link to="/">
        <img src="samsol.jpg" alt="SamsSolutions" className="logo" />
      </Link>

      {/* Navigation Links */}
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/education">Education</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/services">Services</Link>

        {/* Conditional Links for Authenticated Users */}
        {isLoggedIn && <Link to="/messages">Messages</Link>}
        {isLoggedIn && <button onClick={logoutUser} className="nav-button">Logout</button>}

        {/* Conditional Links for Admin */}
        {isAdmin && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            {/* <Link to="/admin/messages">View Messages</Link> */}
            {/* <Link to="/admin/projects">Manage Projects</Link> */}
          </>
        )}

        {/* Links for Guests */}
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
