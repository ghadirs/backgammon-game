import {BoardStateType as BoardState} from "@/types/board.ts";
import {MoveType as Move} from "@/types/board.ts";
import {PlayerEnum as Player} from "@/types/board.ts";
import {DiePhysicsType as DiePhysics} from "@/types/board.ts";
import {PointType as Point} from "@/types/board.ts";
import {AnimatingCheckerType as AnimatingChecker} from "@/types/board.ts";

export type GameMode = 'SINGLE' | 'ONLINE' | 'PRIVATE';

export interface User {
    id: string;
    username: string;
    avatar: string;
    points: number;
    isPro: boolean;
}

export interface WalletOption {
    points: number;
    ton: string;
    icon: string; // path to icon
}

export type GameResult = 'WIN' | 'LOSE';

export type {BoardState, Move, DiePhysics, Point, AnimatingChecker};

export {Player};
