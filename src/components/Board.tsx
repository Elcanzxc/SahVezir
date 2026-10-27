import React from 'react';
import { SquareId, PieceState } from '../types';
import { ALL_SQUARES } from '../utils/chessLogic';
import { Square } from './Square';
import { Piece } from './Piece';
import { useApp } from '../context/AppContext';

interface BoardProps {
  pieces: PieceState[];
  selectedPieceId: string | null;
  validMoves: SquareId[];
  lastMove: { from: SquareId; to: SquareId } | null;
  isSolving: boolean;
  onSelectPiece: (pieceId: string) => void;
  onSquareClick: (square: SquareId) => void;
}

export const Board: React.FC<BoardProps> = ({
  pieces,
  selectedPieceId,
  validMoves,
  lastMove,
  isSolving,
  onSelectPiece,
  onSquareClick,
}) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-3xl shadow-2xl border transition-colors duration-200 ${
        isDark
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/60 shadow-black/60'
          : 'bg-gradient-to-b from-slate-100 via-white to-slate-100 border-slate-200 shadow-slate-300'
      }`}
    >
      {/* Outer wooden board rim */}
      <div className="relative p-3.5 bg-[#4a3525] rounded-2xl shadow-inner border border-[#302217]">
        {/* Board inner container with 3x3 grid */}
        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-lg overflow-hidden shadow-2xl">
          {/* 3x3 Grid of squares */}
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
            {ALL_SQUARES.map((square) => {
              const isValid = validMoves.includes(square);
              const isLastFrom = lastMove?.from === square;
              const isLastTo = lastMove?.to === square;

              return (
                <Square
                  key={square}
                  square={square}
                  isValidMoveTarget={isValid}
                  isLastMoveFrom={isLastFrom}
                  isLastMoveTo={isLastTo}
                  onClick={() => onSquareClick(square)}
                />
              );
            })}
          </div>

          {/* Pieces Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {pieces.map((piece) => {
              const isSelected = selectedPieceId === piece.id;

              return (
                <Piece
                  key={piece.id}
                  piece={piece}
                  isSelected={isSelected}
                  isDisabled={isSolving}
                  onClick={() => onSelectPiece(piece.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Board bottom caption */}
      <div
        className={`mt-3 flex items-center justify-between w-full px-2 text-xs transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {t.boardTitle}
        </span>
        <span
          className={`font-mono text-[11px] ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          {isSolving ? t.boardHintSolving : t.boardHintSelect}
        </span>
      </div>
    </div>
  );
};
