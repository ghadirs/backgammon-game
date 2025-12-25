import { DIMENSIONS } from "@/variables";
const { WIDTH, HEIGHT, SIDEBAR_WIDTH, MARGIN_V } = DIMENSIONS;

export const executeAutoMove = (
  fromIdx: number,
  animatingChecker,
  playableMoves,
  currentPlayer,
  board,
  boardRef,
  setPlayableMoves,
  setAnimatingChecker,
  getCheckerPixels,
) => {
  if (animatingChecker || playableMoves.length === 0) return;

  const moveDir = currentPlayer === 1 ? 1 : -1;
  let chosenMoveIndex = -1;
  let targetIdx = -1;
  let isBearingOff = false;

  // 1. Find Valid Move
  for (let i = 0; i < playableMoves.length; i++) {
    const moveDistance = playableMoves[i];
    const potentialIdx = fromIdx + moveDistance * moveDir;

    // Rule: Bearing Off (Player 1 > 23, Player 2 < 0)
    // Adjust this condition based on your exact board orientation logic
    if (
      (currentPlayer === 1 && potentialIdx > 23) ||
      (currentPlayer === -1 && potentialIdx < 0)
    ) {
      chosenMoveIndex = i;
      isBearingOff = true;
      break;
    }

    if (potentialIdx >= 0 && potentialIdx <= 23) {
      const targetCount = board.points[potentialIdx];
      const isBlocked =
        Math.sign(targetCount) !== 0 &&
        Math.sign(targetCount) !== currentPlayer &&
        Math.abs(targetCount) > 1;

      if (!isBlocked) {
        chosenMoveIndex = i;
        targetIdx = potentialIdx;
        break;
      }
    }
  }

  // 2. Execute Move
  if (chosenMoveIndex !== -1) {
    const moveDistance = playableMoves[chosenMoveIndex];
    if (!isBearingOff) {
      targetIdx = fromIdx + moveDistance * moveDir;
    }

    const startStackIdx = Math.abs(board.points[fromIdx]) - 1;
    const startPos = getCheckerPixels(fromIdx, startStackIdx);

    let endPos;
    const newPoints = [...board.points];
    const newBoard = { ...board, points: newPoints };

    // Remove from source immediately
    newPoints[fromIdx] -= currentPlayer;

    if (isBearingOff) {
      // --- FIX: Target Right Sidebar Trays ---
      // Player 1 (White) moves > 23 (Top Right Tray)
      // Player 2 (Black) moves < 0 (Bottom Right Tray)
      // (Assuming standard counter-clockwise movement where 24 is top right and 1 is bottom right)

      const x = WIDTH - SIDEBAR_WIDTH / 2;

      // Calculate stack offset
      const currentOffCount =
        currentPlayer === 1 ? board.whiteOff : board.blackOff;

      // Player 1 (Top Right Hole), Player 2 (Bottom Right Hole)
      // Adjust these Y values to match the "holes" visual
      const baseY =
        currentPlayer === 1
          ? MARGIN_V + 40 // Top
          : HEIGHT - MARGIN_V - 40; // Bottom

      // Stack direction
      const stackDir = currentPlayer === 1 ? 1 : -1;

      endPos = {
        x: x,
        y: baseY + currentOffCount * 6 * stackDir,
      };

      if (currentPlayer === 1) newBoard.whiteOff++;
      else newBoard.blackOff++;
    } else {
      const targetCount = board.points[targetIdx];
      const isOpponentBlot =
        targetCount !== 0 && Math.sign(targetCount) !== currentPlayer;

      if (isOpponentBlot) {
        // HITTING
        endPos = getCheckerPixels(targetIdx, 0);
        newPoints[targetIdx] = currentPlayer;
        if (currentPlayer === 1) newBoard.blackBar++;
        else newBoard.whiteBar++;
      } else {
        // NORMAL LANDING
        const destStackIdx = Math.abs(targetCount);
        endPos = getCheckerPixels(targetIdx, destStackIdx);
        newPoints[targetIdx] += currentPlayer;
      }
    }

    // Sync Ref
    boardRef.current = newBoard;

    // Update Moves
    const newPlayableMoves = [...playableMoves];
    newPlayableMoves.splice(chosenMoveIndex, 1);
    setPlayableMoves(newPlayableMoves);

    // --- TRIGGER ANIMATION WITH TO_IDX ---
    setAnimatingChecker({
      fromX: startPos.x,
      fromY: startPos.y,
      toX: endPos.x,
      toY: endPos.y,
      fromIdx: fromIdx,
      // Pass the destination info so we can hide the static checker
      toIdx: targetIdx,
      isBearingOff: isBearingOff,
      color: currentPlayer,
      startTime: performance.now(),
      newPoints: newPoints,
      newBoardState: newBoard,
    });
  }
};

export const resetDice = (dicePhysics: any) => {
  const fromSide = Math.random() > 0.5 ? 1 : 0;

  dicePhysics.current.forEach((p, i) => {
    p.x = fromSide === 1 ? WIDTH + 80 : -80;

    // Aim for the vertical center (the gutter) to avoid initial checker hits
    p.y = HEIGHT / 2 + (i === 0 ? -25 : 25);

    const speed = 14 + Math.random() * 3;
    p.vx = fromSide === 1 ? -speed : speed;
    p.vy = (Math.random() - 0.5) * 2; // Low vertical spread

    p.altitude = 40;
    p.vAltitude = 6 + Math.random() * 4;
    p.vAngle = 0.2 + Math.random() * 0.3;
  });
};
