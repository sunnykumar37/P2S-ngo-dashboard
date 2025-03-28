import { cookies } from 'next/headers';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // Also set the token in a cookie for server-side access
    document.cookie = `token=${token}; path=/`;
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    // Also remove the token from cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const setUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  removeUser();
  window.location.href = '/login';
}; 