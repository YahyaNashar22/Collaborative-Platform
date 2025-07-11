import { create } from "zustand";

interface AuthState {
  user: { [key: string]: string } | null;
  loading: boolean;
  setUser: (user: { [key: string]: string } | null) => void;
  setLoading: (loading: boolean) => void;
}

const authStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export default authStore;
