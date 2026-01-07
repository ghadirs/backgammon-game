import { create } from "zustand";
import { GameTypeEnum } from "@/types/lobby.ts";

// Define the types of modals available in your app
type ModalType = "game" | "confirm-purchase" | "versus" | null;

interface ModalStore {
  type: ModalType;
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  gameType: GameTypeEnum | null;
  setGameType: (game: GameTypeEnum) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  openModal: (type) => set({ type, isOpen: true }),
  closeModal: () => set({ type: null, isOpen: false }),
  gameType: null,
  setGameType: (game: GameTypeEnum) => set({ gameType: game }),
}));
