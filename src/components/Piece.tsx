import React from 'react';
import { motion } from 'framer-motion';
import { PieceState } from '../types';
import { SQUARE_COORDINATES } from '../utils/chessLogic';
import { ChessIcon } from './ChessIcon';
import { useApp } from '../context/AppContext';

interface PieceProps {
  piece: PieceState;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const Piece: React.FC<PieceProps> = ({
  piece,
  isSelected,
  isDisabled,
  onClick,
}) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const coord = SQUARE_COORDINATES[piece.square];
  const isWhite = piece.color === 'white';

  // Board is 3x3, row 3 is top (y=2 -> top=0%), row 1 is bottom (y=0 -> top=66.66%)
  const leftPercent = coord.x * (100 / 3);
  const topPercent = (2 - coord.y) * (100 / 3);

  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer pointer-events-auto"
      style={{
        width: '33.3333%',
        height: '33.3333%',
        zIndex: isSelected ? 30 : 20,
      }}
      animate={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        scale: isSelected ? 1.08 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 24,
        stiffness: 280,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDisabled) {
          onClick();
        }
      }}
      whileHover={!isDisabled ? { scale: isSelected ? 1.1 : 1.05 } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
    >
      <div className="relative flex items-center justify-center w-full h-full p-2">
        {/* Glow halo when selected */}
        {isSelected && (
          <motion.div
            layoutId="selectionGlow"
            className="absolute inset-2 rounded-2xl bg-amber-400/30 ring-2 ring-amber-400 shadow-lg shadow-amber-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Piece Icon */}
        <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center transition-transform filter drop-shadow-md">
          <ChessIcon
            type={piece.type}
            color={piece.color}
            className="w-full h-full max-w-[85px] max-h-[85px]"
          />
        </div>

        {/* Color badge pill on hover / selected */}
        <div
          className={`absolute bottom-1 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border ${
            isWhite
              ? 'bg-slate-100 text-slate-800 border-slate-300'
              : isDark
              ? 'bg-slate-900 text-slate-200 border-slate-700'
              : 'bg-slate-800 text-slate-100 border-slate-600'
          }`}
        >
          {isWhite ? t.whitePiece : t.blackPiece}
        </div>
      </div>
    </motion.div>
  );
};
