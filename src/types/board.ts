export interface PointType {
  x: number;
  y: number;
}

export interface DiePhysicsType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  altitude: number;
  vAltitude: number;
}

export enum PlayerEnum {
  White = 1,
  Black = -1,
  None = 0,
}

export interface AnimatingCheckerType {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromIdx: number;
  color: number;
  startTime: number;
  newPoints: number[]; // Store the final state to apply after animation
}

// Interface for a game move, added to fix missing member errors
export interface MoveType {
  from: number;
  to: number;
}

export interface BoardStateType {
  points: number[]; // Positive for White, Negative for Black
  whiteBar: number;
  blackBar: number;
  whiteOff: number;
  blackOff: number;
}
