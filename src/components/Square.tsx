import React from 'react';
import { motion } from 'framer-motion';
import { SquareId } from '../types';
import { isLightSquare, SQUARE_COORDINATES } from '../utils/chessLogic';
import { useApp } from '../context/AppContext';

interface SquareProps {
  square: SquareId;
  isValidMoveTarget: boolean;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  square,
  isValidMoveTarget,
  isLastMoveFrom,
  isLastMoveTo,
  onClick,
}) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const coord = SQUARE_COORDINATES[square];
  const isLight = isLightSquare(square);

  const isWhiteTarget = square === 'a3' || square === 'c3';
  const isBlackTarget = square === 'a1' || square === 'c1';

  // Coordinate labels
  const showFile = coord.y === 0; // bottom row
  const showRank = coord.x === 0; // left column

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full flex items-center justify-center transition-colors select-none ${
        isLight
          ? isDark
            ? 'bg-[#d1c2a5] hover:bg-[#d9ccb2]'
            : 'bg-[#f0e4cf] hover:bg-[#faeed9]'
          : isDark
          ? 'bg-[#8c6747] hover:bg-[#99724f]'
          : 'bg-[#b88b4a] hover:bg-[#c79958]'
      } ${isValidMoveTarget ? 'cursor-pointer' : ''}`}
    >
      {/* Last move highlight */}
      {(isLastMoveFrom || isLastMoveTo) && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLastMoveTo ? 'bg-amber-400/30' : 'bg-amber-300/20'
          }`}
        />
      )}

      {/* Target indicator subtle badge in corners */}
      {isWhiteTarget && (
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-75 pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-800 bg-white/90 backdrop-blur px-1 py-0.5 rounded shadow-xs">
            {t.whiteGoal}
          </span>
        </div>
      )}

      {isBlackTarget && (
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 opacity-75 pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-100 bg-slate-900/90 backdrop-blur px-1 py-0.5 rounded shadow-xs">
            {t.blackGoal}
          </span>
        </div>
      )}

      {/* Rank (row 1, 2, 3) label */}
      {showRank && (
        <span
          className={`absolute top-1 left-1.5 text-xs font-bold pointer-events-none ${
            isLight ? 'text-[#8c6747]' : 'text-[#f0e4cf]'
          }`}
        >
          {coord.y + 1}
        </span>
      )}

      {/* File (col a, b, c) label */}
      {showFile && (
        <span
          className={`absolute bottom-1 left-1.5 text-xs font-bold pointer-events-none ${
            isLight ? 'text-[#8c6747]' : 'text-[#f0e4cf]'
          }`}
        >
          {square[0]}
        </span>
      )}

      {/* Valid Move Target Highlight */}
      {isValidMoveTarget && (
        <motion.div
          className="absolute z-10 flex items-center justify-center cursor-pointer pointer-events-auto"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-emerald-500/35 ring-2 ring-emerald-400"
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
            {/* Center dot */}
            <div className="w-5 h-5 rounded-full bg-emerald-500 shadow-md shadow-emerald-600/50 hover:scale-125 transition-transform" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
