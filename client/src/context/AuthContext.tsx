import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import api from '../utils/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string, referralCode?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tridrishti_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = localStorage.getItem('tridrishti_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('tridrishti_user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.warn('Failed to refresh authenticated user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { user, tokens } = res.data;
        localStorage.setItem('tridrishti_token', tokens.accessToken);
        localStorage.setItem('tridrishti_user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'An error occurred during login',
      };
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string, referralCode?: string) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, phone, referralCode });
      if (res.data.success) {
        const { user, tokens } = res.data;
        localStorage.setItem('tridrishti_token', tokens.accessToken);
        localStorage.setItem('tridrishti_user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Registration failed' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'An error occurred during registration',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('tridrishti_token');
    localStorage.removeItem('tridrishti_user');
    setUser(null);
    window.location.href = '/';
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('tridrishti_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
