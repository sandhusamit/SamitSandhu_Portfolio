/*
  AuthContext to manage user authentication and quiz data.
  Provides functions for user registration, login, logout, and fetching quizzes.
  Allows storing and accessing authentication state across the app - no need to recall API on every page.
  Uses service functions to interact with backend API - where the fetch requests are stored and managed.
*/
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  registerUser as registerUserService,
  getUserDataById as getUserDataByIdService,
  getUsers as adminGetUsersService,
  deleteUserById as adminDeleteUserService,
} from '../services/user';
import { createContact as createContactService,
  getContacts, deleteContactById,
  updateContactById
  
 } from '../services/contact';
import { getProjects, deleteProjectById } from '../services/project.js';
import { login as loginUserService } from '../services/auth.js';
import { getAboutInfo as aboutPageService } from '../services/about.js';
import { createMessage as createMessageService
, fetchMessages as fetchMessagesService

 } from '../services/message.js';

import bcrypt from 'bcryptjs';


const AuthContext = createContext();

// Checks local storage for user and auth data every time the app loads.
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [authUserId, setAuthUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [aboutPageData, setAboutPageData] = useState(null);
  const [messageData, setMessageData] = useState({
    contactID: "",
    message: "",
    service: "",
  });
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('bearer_token'); // ✅ correct
  
    if (userId && token) {
      console.log("AuthContext: Found userId and token in localStorage.");
      setAuthUserId(userId);
      setJwtToken(token);
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    } // else condition
    setIsAuthorized(true);
  }, [jwtToken, authUserId, isLoggedIn]);


  // User Management 

  const registerUser = async (userData) => {
    try {
      const data = await registerUserService(userData);
      console.log("AuthContext: registerUser data:", data);
      if (!data || data.hasError) navigate('/error', { state: { message: data } });
      return data;
    } catch (error) {
      navigate('/error', {
        state: 'A serious error occurred while registering.\nPlease try again.',
      });
    }
  };


  const loginUser = async (userData) => {
    try {
      console.log("AuthContext: Attempting to log in user:", userData.email);
      const data = await loginUserService(userData); // null check for data?
      if (data && data.hasError) navigate('/error', { state: data });
      if (data && !data.hasError) {
        const { token, user } = data; // Should we perform null checks for token and user?
        localStorage.setItem('userId', user._id);
        localStorage.setItem('bearer_token', token);
        setAuthUserId(user._id);
        setJwtToken(token);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      navigate('/error', {
        state: 'A serious error occurred while logging in.\nPlease try again.',
      });
    }
  };

  
  const logoutUser = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('bearer_token');
    setAuthUserId('');
    setJwtToken('');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const getCurrentUserData = async () => {
    try {
      const data = await getUserDataByIdService(authUserId, jwtToken); // null check for data?
      if (data && data.hasError) navigate('/error', { state: data });
      if (data && !data.hasError) {
        return data.user;
      }
    } catch (error) {
      navigate('/error', {
        state: 'A serious error occurred.',
      });
    }
  }; 
  
// Page Management
//aboutPage 

const fetchAboutPageInfo = async () => {
  try {
    const data = await aboutPageService();
    if (data && !data.hasError) {
      setAboutPageData(data.data);
      return data.data;
    }
  } catch (error) {
    navigate('/error', { state: 'Error fetching About Page.' });
  }
};



// Contact Management

const newContact = async (contactData) => {
  try {
    const data = await createContactService(contactData);
    console.log('AuthContext: newContact data:', data);

    if (data && !data.hasError && data.contact && data.contact._id) {
      // Assuming you have a state for message creation
      setMessageData(prev => ({
        ...prev,
        contactID: data.contact._id // ensures contactID is not null
      }));

      return data.contact; // return the created contact
    } else {
      console.warn('Contact creation returned invalid data:', data);
      return null;
    }

  } catch (error) {
    console.error('Error creating contact:', error);
    navigate('/error', {
      state: 'A serious error occurred while submitting contact information.\nPlease try again.',
    });
  }
};


  // Message Management
  const newMessage = async (messageData) => {
    try {
      // Implement message creation logic here
      const data = await createMessageService(messageData);
      
      return data;
    } catch (error) {
      navigate('/error', {
        state: 'A serious error occurred while submitting message information.\nPlease try again.',
      });
    }
  };

  const getMessages = async () => {
    try {
      console.log("AuthContext: Fetching messages for user:", authUserId);
      // Implement fetching messages logic here
      const data = await fetchMessagesService(authUserId, jwtToken);
      return data;
    }
    catch (error) {
      navigate('/error', {
        state: 'A serious error occurred while fetching messages.\nPlease try again.',
      });
    }
  }
// ================================
// ADMIN CRUD OPERATIONS
// ================================

// --- USERS ---
const adminGetUsers = async () => {
  try {
    return await adminGetUsersService(jwtToken);
  } catch (err) {
    console.error("Admin getUsers failed:", err);
  }
};

const adminDeleteUser = async (userId) => {
  try {
    return await adminDeleteUserService(userId, jwtToken);
  } catch (err) {
    console.error("Admin deleteUser failed:", err);
  }
};

const adminUpdateUser = async (userId, user, userData) => {
  try {
    // const salt = await bcrypt.hash(userData.password, 10);
    userData.password = await bcrypt.hash(userData.password, 10);
    console.log("adminUpdateUser userData:", userData);

    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return await res.json();
  } catch (err) {
    console.error("adminUpdateUser error:", err);
  }
};


// --- CONTACTS ---
const adminGetContacts = async () => {
  try {
    return await getContacts(jwtToken);
  } catch (err) {
    console.error("Admin getContacts failed:", err);
  }
};

const adminDeleteContact = async (contactId) => {
  try {
    return await deleteContactById(contactId, jwtToken);
  } catch (err) {
    console.error("Admin deleteContact failed:", err);
  }
};

const adminUpdateContact = async (contactId, contactData) => {
  try {
    return await updateContactById(contactId, contactData, jwtToken);
  } catch (err) {
    console.error("Admin updateContact failed:", err);
  }
};

    


// --- PROJECTS (Admin CRUD) ---
const adminGetProjects = async () => {
  try {
    const res = await fetch("/api/projects", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.error("adminGetProjects error:", err);
    return [];
  }
};

const adminCreateProject = async (projectData) => {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return await res.json();
  } catch (err) {
    console.error("adminCreateProject error:", err);
  }
};

const adminUpdateProject = async (projectId, projectData) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return await res.json();
  } catch (err) {
    console.error("adminUpdateProject error:", err);
  }
};

const adminDeleteProject = async (projectId) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    if (!res.ok) throw new Error("Failed to delete project");
    return await res.json();
  } catch (err) {
    console.error("adminDeleteProject error:", err);
  }
};


//Add into seperate services after

 // ----------- NAVIGATION METHODS -----------
 const goToUsers = () => navigate("/admin/users");
 const goToMessages = () => navigate("/admin/messages");
 const goToProjects = () => navigate("/admin/projects");
 const goToDashboard = () => navigate("/admin");
 const goHome = () => navigate("/");
const goToContacts = () => navigate("/admin/contacts");

  return (
    <AuthContext.Provider
      value={{
        authUserId,
        jwtToken,
        isLoggedIn,
        isAuthorized,
        registerUser,
        loginUser,
        logoutUser,
        getCurrentUserData,
        isAdmin,
        fetchAboutPageInfo,
        newContact,
        newMessage,
        getMessages,
        adminGetUsers,
        adminDeleteUser,
        adminUpdateUser,

        adminGetContacts,
        adminDeleteContact,
        adminUpdateContact,
        
        adminGetProjects,
        adminDeleteProject,
        adminCreateProject,
        adminUpdateProject,
        goToUsers,
        goToMessages,
        goToProjects,
        goToDashboard,
        goHome,
        goToContacts,


        }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
