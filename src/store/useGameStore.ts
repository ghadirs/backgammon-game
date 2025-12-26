import {create} from 'zustand';
import {User, GameResult, GameMode} from '@/types';

interface GameState {
    user: User;
    currentMode: GameMode | null;
    currentBet: number;
    balance: number; // Local state of balance for immediate UI updates
    showResultModal: boolean;
    result: GameResult | null;

    // Actions
    setBalance: (amount: number) => void;
    startGame: (mode: GameMode, bet: number) => void;
    endGame: (result: GameResult, amountChange: number) => void;
    closeResult: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    user: {
        id: '1',
        username: 'Taylor Swift',
        avatar: '/avatar.png',
        points: 32.67,
        isPro: false,
        balance: 1000000000, // 1 Billion
    },
    currentMode: null,
    currentBet: 0,
    balance: 1000000000,
    showResultModal: false,
    result: null,

    setBalance: (amount) => set({balance: amount}),

    startGame: (mode, bet) => set({
        currentMode: mode,
        currentBet: bet,
        showResultModal: false
    }),

    endGame: (result, amountChange) => set((state) => ({
        result,
        showResultModal: true,
        balance: state.balance + amountChange,
        currentMode: null // Return to lobby state logically
    })),

    closeResult: () => set({showResultModal: false, result: null}),
}));