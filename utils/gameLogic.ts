import { BoardState, Move, Player } from '../types';

export const INITIAL_BOARD: BoardState = {
  // 0 is unused for 1-based indexing convenience in logic, though arrays are 0-based. 
  // We will use 0 and 25 as "off board" or "bar" conceptual indices in some mapping, 
  // but for the state array 'points', we'll use 0-23 for the board slots.
  // Wait, let's stick to standard 0-23 array for the board points.
  // Point 0 = White's Home inner most, Black's Outer most?
  // Let's standardise: 
  // White moves from higher indices to lower indices (23 -> 0).
  // Black moves from lower indices to higher indices (0 -> 23).
  // White Home Board: 0-5.
  // Black Home Board: 18-23.
  
  // Standard Setup:
  // 24 points (0-23)
  // White: 2 at 23, 5 at 12, 3 at 7, 5 at 5.
  // Black: 2 at 0, 5 at 11, 3 at 16, 5 at 18.
  
  points: [
    -2, 0, 0, 0, 0, 5,   // 0-5 (White Home)
    0, 3, 0, 0, 0, -5,   // 6-11
    5, 0, 0, 0, 0, -3,   // 12-17
    0, 5, 0, 0, 0, 2     // 18-23 (Black Home)
  ],
  whiteBar: 0,
  blackBar: 0,
  whiteOff: 0,
  blackOff: 0,
};

// Returns true if the move is valid according to the dice and board state
export const isValidMove = (
  board: BoardState,
  player: Player,
  from: number,
  to: number,
  dieValue: number
): boolean => {
  // Check basic bounds
  if (from === -1 && player === Player.White && board.whiteBar === 0) return false;
  if (from === -1 && player === Player.Black && board.blackBar === 0) return false;
  
  // Logic mapping: 
  // White Bar = special index '24' conceptually for movement logic downwards? 
  // Let's use specific constants for interactions.
  // In this function, 'from' and 'to' are 0-23 indices. 
  // Special case: 'from' = 'BAR_WHITE' or 'BAR_BLACK'.
  
  const direction = player === Player.White ? -1 : 1;
  
  // 1. Must use bar if checkers are on it
  if (player === Player.White && board.whiteBar > 0) {
    if (from !== 24) return false; // Must move from bar (we'll call White Bar index 24 for 'from')
    // White enters into 23, 22, 21, 20, 19, 18 based on die (1-6)
    // Destination index = 24 - dieValue.
    if (to !== 24 - dieValue) return false;
  } else if (player === Player.Black && board.blackBar > 0) {
    if (from !== -1) return false; // Must move from bar (we'll call Black Bar index -1 for 'from')
    // Black enters into 0, 1, 2, 3, 4, 5 based on die (1-6)
    // Destination index = dieValue - 1.
    if (to !== dieValue - 1) return false;
  } else {
    // Normal move validation
    if (from < 0 || from > 23) return false; // Invalid source
    if (player === Player.White && board.points[from] <= 0) return false; // Not your piece
    if (player === Player.Black && board.points[from] >= 0) return false; // Not your piece
    
    // Check distance
    const dist = player === Player.White ? from - to : to - from;
    if (dist !== dieValue) {
        // Special case: Bearing off with larger dice
        const isBearingOff = canBearOff(board, player);
        if (!isBearingOff) return false;
        
        // If bearing off, 'to' might be 'OFF_BOARD'
        // Let's denote White Off as -1, Black Off as 24?
        // Let's simplify: if to is 'off'
    }
  }

  // Destination validation (Hitting & Blocking)
  // Logic handled in specific move generator usually, but here for validation:
  if (to >= 0 && to <= 23) {
    const targetCount = board.points[to];
    // Cannot land on 2 or more opponent pieces
    if (player === Player.White && targetCount < -1) return false;
    if (player === Player.Black && targetCount > 1) return false;
  }

  return true;
};

// Check if a player can bear off
export const canBearOff = (board: BoardState, player: Player): boolean => {
  if (player === Player.White) {
    if (board.whiteBar > 0) return false;
    // Check if all pieces are in 0-5
    for (let i = 6; i < 24; i++) {
      if (board.points[i] > 0) return false;
    }
    return true;
  } else {
    if (board.blackBar > 0) return false;
    // Check if all pieces are in 18-23
    for (let i = 0; i < 18; i++) {
      if (board.points[i] < 0) return false;
    }
    return true;
  }
};

// Get all possible legal moves for a specific die
// fromIndex can be 0-23, or 24 (White Bar), or -1 (Black Bar)
export const getLegalMovesForDie = (
  board: BoardState,
  player: Player,
  die: number
): Move[] => {
  const moves: Move[] = [];
  const direction = player === Player.White ? -1 : 1;

  // 1. Check Bar
  if (player === Player.White && board.whiteBar > 0) {
    const dest = 24 - die; // 23 down to 18
    if (board.points[dest] >= -1) { // Open or hit
      moves.push({ from: 24, to: dest });
    }
    return moves; // Must move from bar
  }
  if (player === Player.Black && board.blackBar > 0) {
    const dest = die - 1; // 0 up to 5
    if (board.points[dest] <= 1) { // Open or hit
      moves.push({ from: -1, to: dest });
    }
    return moves; // Must move from bar
  }

  // 2. Normal Moves & Bearing Off
  const canBear = canBearOff(board, player);

  for (let i = 0; i < 24; i++) {
    // Check if player has piece at i
    if (player === Player.White && board.points[i] <= 0) continue;
    if (player === Player.Black && board.points[i] >= 0) continue;

    let dest = i + (direction * die);

    // Bearing off logic
    if (player === Player.White) {
      if (dest < 0) {
        if (canBear) {
          if (dest === -1) { // Exact bear off
             moves.push({ from: i, to: -1 }); // -1 denotes White Off
          } else {
            // Over-shoot bear off? 
            // Allowed if no pieces on higher points
            let higherPieces = false;
            for (let k = i + 1; k < 6; k++) {
              if (board.points[k] > 0) higherPieces = true;
            }
            if (!higherPieces) {
               moves.push({ from: i, to: -1 });
            }
          }
        }
      } else {
        // Normal move
        if (board.points[dest] >= -1) {
          moves.push({ from: i, to: dest });
        }
      }
    } else {
      // Black
      if (dest > 23) {
        if (canBear) {
          if (dest === 24) { // Exact bear off
            moves.push({ from: i, to: 24 }); // 24 denotes Black Off
          } else {
             // Over-shoot
             let higherPieces = false;
             for (let k = i - 1; k > 17; k--) {
               if (board.points[k] < 0) higherPieces = true;
             }
             if (!higherPieces) {
               moves.push({ from: i, to: 24 });
             }
          }
        }
      } else {
        // Normal move
        if (board.points[dest] <= 1) {
          moves.push({ from: i, to: dest });
        }
      }
    }
  }

  return moves;
};

// Apply a move to a NEW board state object (immutability)
export const applyMove = (board: BoardState, move: Move, player: Player): BoardState => {
  const newBoard = { ...board, points: [...board.points] };

  // Remove from source
  if (move.from === 24) {
    newBoard.whiteBar--;
  } else if (move.from === -1) {
    newBoard.blackBar--;
  } else {
    if (player === Player.White) newBoard.points[move.from]--;
    else newBoard.points[move.from]++;
  }

  // Add to destination
  if (move.to === -1) {
    newBoard.whiteOff++;
  } else if (move.to === 24) {
    newBoard.blackOff++;
  } else {
    // Check hit
    const destCount = newBoard.points[move.to];
    if (player === Player.White) {
      if (destCount === -1) {
        // Hit Black
        newBoard.points[move.to] = 1; // Now 1 White
        newBoard.blackBar++;
      } else {
        newBoard.points[move.to]++;
      }
    } else {
      if (destCount === 1) {
        // Hit White
        newBoard.points[move.to] = -1; // Now 1 Black
        newBoard.whiteBar++;
      } else {
        newBoard.points[move.to]--;
      }
    }
  }

  return newBoard;
};
