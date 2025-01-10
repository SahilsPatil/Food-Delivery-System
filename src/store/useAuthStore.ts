import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '../lib/api';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (username, password) => {
        const { data } = await auth.login(username, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
      },
      register: async (username, password) => {
        const { data } = await auth.register(username, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);