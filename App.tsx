import React, { useState, useEffect } from 'react';
import BackgammonBoard from './components/BackgammonBoard';
import { Player, BoardState } from './types';
import DiceCanvas from "@/components/DiceCanvas.tsx";

const INITIAL_BOARD: BoardState = {
  points: [
    -2, 0, 0, 0, 0, 5,
    0, 3, 0, 0, 0, -5,
    5, 0, 0, 0, 0, -3,
    0, 5, 0, 0, 0, 2
  ],
  whiteBar: 0,
  blackBar: 0,
  whiteOff: 0,
  blackOff: 0,
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.White);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    let rolls = 0;
    const interval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      rolls++;
      if (rolls > 15) {
        clearInterval(interval);
        setIsRolling(false);
        setCurrentPlayer(prev => prev === Player.White ? Player.Black : Player.White);
      }
    }, 60);
  };

  const handlePointClick = (index: number) => {
    // Basic sandbox interaction: move a piece if clicked
    const newBoard = { ...board, points: [...board.points] };
    const count = newBoard.points[index];
    
    if (count !== 0) {
      // Just a simple demo interaction: clicking a point shifts one piece to the next logical point
      const direction = count > 0 ? -1 : 1;
      const nextIndex = (index + direction + 24) % 24;
      
      if (count > 0) newBoard.points[index]--;
      else newBoard.points[index]++;
      
      if (count > 0) newBoard.points[nextIndex]++;
      else newBoard.points[nextIndex]--;
      
      setBoard(newBoard);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-8 font-serif">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-[#d4af37] tracking-widest uppercase mb-2 drop-shadow-md">
          Royal Backgammon
        </h1>
        <p className="text-[#a8905a] italic text-lg">A Masterpiece of Strategy & Luck</p>
      </div>

      // Inside App.tsx return statement
      <div className="relative group">
        <BackgammonBoard
            board={board}
            onPointClick={handlePointClick}
            p1Score={88}
            p2Score={51}
        />

        {/* NEW CANVAS DICE OVERLAY */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <DiceCanvas dice={dice} isRolling={isRolling} />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-6">
        <button 
          onClick={rollDice}
          disabled={isRolling}
          className="px-12 py-4 bg-gradient-to-b from-[#d4af37] to-[#aa8a2e] text-black font-bold text-xl rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
        >
          {isRolling ? 'ROLLING...' : 'ROLL DICE'}
        </button>
        
        <div className="text-[#d4af37] text-sm uppercase tracking-[0.3em] font-bold">
          {currentPlayer === Player.White ? "White's Turn" : "Black's Turn"}
        </div>
      </div>
    </div>
  );
};

const DiceFace = ({ value }: { value: number }) => {
  const dots = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-10 h-10 gap-1 p-1">
      {[...Array(9)].map((_, i) => (
        <div key={i} className={`flex items-center justify-center`}>
          {dots[value as keyof typeof dots].includes(i) && (
            <div className="w-2 h-2 bg-slate-900 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default App;