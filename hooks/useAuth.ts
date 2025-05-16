import { create } from 'zustand';
import { storage } from '@/utils/storage';
import { api } from '@/utils/api';
import type { User } from '@/types/auth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  initialize: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshProfile: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  
  initialize: async () => {
    try {
      const token = await storage.getToken();
      if (token) {
        // If we have a token, fetch the user profile
        const user = await api.user.getProfile();
        set({ isAuthenticated: true, user, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      // If there's an error (e.g. invalid token), clear the auth state
      await storage.removeToken();
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
  
  login: (user) => {
    set({ isAuthenticated: true, user });
  },
  
  logout: async () => {
    await storage.removeToken();
    set({ isAuthenticated: false, user: null });
  },
  
  updateUser: (user) => set({ user }),
  
  refreshProfile: async () => {
    try {
      const user = await api.user.getProfile();
      set({ user });
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  },
})); 