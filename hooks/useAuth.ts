import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    phone: string;
    name?: string;
  } | null;
  login: (phone: string) => void;
  logout: () => void;
  setUser: (user: { phone: string; name?: string }) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: (phone) => set({ isAuthenticated: true, user: { phone } }),
  logout: () => set({ isAuthenticated: false, user: null }),
  setUser: (user) => set({ user }),
})); 