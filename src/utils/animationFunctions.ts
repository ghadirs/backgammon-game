export const executeAutoMove = (
  fromIdx: number,
  animatingChecker,
  playableMoves,
  currentPlayer,
  board,
  setPlayableMoves,
  setAnimatingChecker,
  getCheckerPixels,
) => {
  if (animatingChecker) return; // Prevent double clicks
  if (playableMoves.length === 0) return; // No moves left

  const moveDir = currentPlayer === 1 ? 1 : -1;
  let chosenMoveIndex = -1;
  let targetIdx = -1;

  // 1. Find the first valid move from our queue of playable moves
  for (let i = 0; i < playableMoves.length; i++) {
    const moveDistance = playableMoves[i];
    const potentialIdx = fromIdx + moveDistance * moveDir;

    // Check bounds
    if (potentialIdx >= 0 && potentialIdx <= 23) {
      const targetCount = board.points[potentialIdx];

      // Rule: Destination must be empty, yours, or a blot (1 opponent)
      const isBlocked =
        Math.sign(targetCount) !== 0 &&
        Math.sign(targetCount) !== currentPlayer &&
        Math.abs(targetCount) > 1;

      if (!isBlocked) {
        chosenMoveIndex = i;
        targetIdx = potentialIdx;
        break; // We found a valid move, stop looking
      }
    }
  }

  // 2. If a valid move was found, execute it
  if (chosenMoveIndex !== -1) {
    const moveDistance = playableMoves[chosenMoveIndex];

    // Inside executeAutoMove logic
    const startStackIdx = Math.abs(board.points[fromIdx]) - 1;
    const startPos = getCheckerPixels(fromIdx, startStackIdx); // Point A

    const targetCount = board.points[targetIdx];
    const isOpponent =
      targetCount !== 0 && Math.sign(targetCount) !== currentPlayer;
    // If hitting, destination is index 0. Otherwise, it's at the top of the stack.
    const destStackIdx = isOpponent ? 0 : Math.abs(board.points[targetIdx]);
    const endPos = getCheckerPixels(targetIdx, destStackIdx); // Point B

    // --- Update Board State logic ---
    const newPoints = [...board.points];
    newPoints[fromIdx] -= currentPlayer; // Remove from old

    // Handle Hitting logic (Sending opponent to bar? For now we just replace)
    if (isOpponent) {
      // In a full game, you'd increment opponent's bar count here
      newPoints[targetIdx] = currentPlayer;
    } else {
      newPoints[targetIdx] += currentPlayer;
    }

    // --- CRITICAL: Remove the used move from the state ---
    const newPlayableMoves = [...playableMoves];
    newPlayableMoves.splice(chosenMoveIndex, 1); // Remove the specific die used
    setPlayableMoves(newPlayableMoves);

    // --- Trigger Animation ---
    setAnimatingChecker({
      fromX: startPos.x,
      fromY: startPos.y,
      toX: endPos.x,
      toY: endPos.y,
      fromIdx: fromIdx,
      color: currentPlayer,
      startTime: performance.now(),
      newPoints: newPoints,
    });
  }
};

export const resetDice = (dicePhysics: any, logicalWidth, logicalHeight) => {
  const fromSide = Math.random() > 0.5 ? 1 : 0;

  dicePhysics.current.forEach((p, i) => {
    p.x = fromSide === 1 ? logicalWidth + 80 : -80;

    // Aim for the vertical center (the gutter) to avoid initial checker hits
    p.y = logicalHeight / 2 + (i === 0 ? -25 : 25);

    const speed = 14 + Math.random() * 3;
    p.vx = fromSide === 1 ? -speed : speed;
    p.vy = (Math.random() - 0.5) * 2; // Low vertical spread

    p.altitude = 40;
    p.vAltitude = 6 + Math.random() * 4;
    p.vAngle = 0.2 + Math.random() * 0.3;
  });
};
