import { create } from "zustand";

interface UserState {
  username: string;
  isLoggedIn: boolean;
  // Actions
  updateUsername: (name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: "",
  isLoggedIn: false,
  updateUsername: (name) => set({ username: name, isLoggedIn: true }),
  logout: () => set({ username: "", isLoggedIn: false }),
}));
