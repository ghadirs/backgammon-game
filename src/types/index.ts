export enum Player {
    White = 1,
    Black = -1,
    None = 0
}

// Interface for a game move, added to fix missing member errors
export interface Move {
    from: number;
    to: number;
}

export interface BoardState {
    points: number[]; // Positive for White, Negative for Black
    whiteBar: number;
    blackBar: number;
    whiteOff: number;
    blackOff: number;
}
