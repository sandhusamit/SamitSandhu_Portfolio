import axios from 'axios';
const END_POINT = '/api/users';

export const registerUser = async (userData) => {
  const res = await fetch(END_POINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem occured during registration. Please try again.',
    };
  }

  const { user, token } = await res.json();
  return { hasError: false, user, token };
};

export const getUserDataById = async (userId, token) => {
  const res = await fetch(`${END_POINT}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `$Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem occured during registration. Please try again.',
    };
  }

  const user = await res.json();
  return { hasError: false, user };
};

export const getUsers = async (token) => {
  const res = await fetch(END_POINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem occured fetching users. Please try again.',
    };
  }

  const users = await res.json();
  return users;
};

export const deleteUserById = async (userId, token) => {
  const res = await fetch(`${END_POINT}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem occured deleting the user. Please try again.',
    };
  }

  const result = await res.json();
  return result;
};

// // USERS
// export const adminUserService = {
//   getUsers: (token) => axios.get("/api/users", authHeader(token)).then(r => r.data),
//   deleteUser: (id, token) => axios.delete(`/api/users/${id}`, authHeader(token)).then(r => r.data),
// };

