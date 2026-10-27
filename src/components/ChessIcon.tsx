import React from 'react';
import { PieceType, PieceColor } from '../types';

interface ChessIconProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

export const ChessIcon: React.FC<ChessIconProps> = ({ type, color, className = 'w-16 h-16' }) => {
  const isWhite = color === 'white';

  if (type === 'queen') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* White Queen Gradients */}
          <linearGradient id="whiteQueenBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="whiteQueenCrown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Black Queen Gradients */}
          <linearGradient id="blackQueenBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="blackQueenCrown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <filter id="pieceShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter="url(#pieceShadow)">
          {/* Base */}
          <ellipse
            cx="50"
            cy="82"
            rx="30"
            ry="7"
            fill={isWhite ? 'url(#whiteQueenBody)' : 'url(#blackQueenBody)'}
            stroke={isWhite ? '#64748b' : '#020617'}
            strokeWidth="2.5"
          />
          <path
            d="M 23 81 C 23 76 30 73 50 73 C 70 73 77 76 77 81 Z"
            fill={isWhite ? 'url(#whiteQueenBody)' : 'url(#blackQueenBody)'}
            stroke={isWhite ? '#64748b' : '#020617'}
            strokeWidth="2"
          />

          {/* Mid Body */}
          <path
            d="M 28 73 C 33 60 36 48 38 42 C 45 44 55 44 62 42 C 64 48 67 60 72 73 Z"
            fill={isWhite ? 'url(#whiteQueenBody)' : 'url(#blackQueenBody)'}
            stroke={isWhite ? '#64748b' : '#020617'}
            strokeWidth="2.5"
          />

          {/* Crown */}
          <path
            d="M 22 34 L 32 46 L 50 28 L 68 46 L 78 34 C 74 50 64 54 50 54 C 36 54 26 50 22 34 Z"
            fill={isWhite ? 'url(#whiteQueenBody)' : 'url(#blackQueenBody)'}
            stroke={isWhite ? '#64748b' : '#020617'}
            strokeWidth="2.5"
          />

          {/* Crown Jewels (Pearls) */}
          <circle cx="22" cy="33" r="4" fill={isWhite ? 'url(#whiteQueenCrown)' : 'url(#blackQueenCrown)'} stroke={isWhite ? '#94a3b8' : '#0f172a'} strokeWidth="1.5" />
          <circle cx="36" cy="27" r="4" fill={isWhite ? 'url(#whiteQueenCrown)' : 'url(#blackQueenCrown)'} stroke={isWhite ? '#94a3b8' : '#0f172a'} strokeWidth="1.5" />
          <circle cx="50" cy="23" r="5" fill={isWhite ? 'url(#whiteQueenCrown)' : 'url(#blackQueenCrown)'} stroke={isWhite ? '#94a3b8' : '#0f172a'} strokeWidth="1.5" />
          <circle cx="64" cy="27" r="4" fill={isWhite ? 'url(#whiteQueenCrown)' : 'url(#blackQueenCrown)'} stroke={isWhite ? '#94a3b8' : '#0f172a'} strokeWidth="1.5" />
          <circle cx="78" cy="33" r="4" fill={isWhite ? 'url(#whiteQueenCrown)' : 'url(#blackQueenCrown)'} stroke={isWhite ? '#94a3b8' : '#0f172a'} strokeWidth="1.5" />

          {/* Subtle center jewel */}
          <circle cx="50" cy="50" r="3" fill={isWhite ? '#38bdf8' : '#a855f7'} opacity="0.8" />
        </g>
      </svg>
    );
  }

  // Knight (Horse)
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* White Knight Gradients */}
        <linearGradient id="whiteKnightBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Black Knight Gradients */}
        <linearGradient id="blackKnightBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <filter id="knightShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#knightShadow)">
        {/* Base */}
        <ellipse
          cx="50"
          cy="83"
          rx="28"
          ry="7"
          fill={isWhite ? 'url(#whiteKnightBody)' : 'url(#blackKnightBody)'}
          stroke={isWhite ? '#64748b' : '#020617'}
          strokeWidth="2.5"
        />
        <path
          d="M 25 82 C 25 77 32 74 50 74 C 68 74 75 77 75 82 Z"
          fill={isWhite ? 'url(#whiteKnightBody)' : 'url(#blackKnightBody)'}
          stroke={isWhite ? '#64748b' : '#020617'}
          strokeWidth="2"
        />

        {/* Knight Head & Mane Profile */}
        <path
          d="M 33 74 
             C 33 66 30 58 24 50 
             C 22 47 24 43 28 44 
             C 31 45 35 49 37 45 
             C 34 38 31 29 37 22 
             C 41 18 48 20 53 25 
             C 57 20 63 21 66 26 
             C 71 34 72 45 74 56 
             C 76 65 72 71 67 74 
             Z"
          fill={isWhite ? 'url(#whiteKnightBody)' : 'url(#blackKnightBody)'}
          stroke={isWhite ? '#64748b' : '#020617'}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Mane Details */}
        <path
          d="M 64 28 C 60 38 62 50 67 62"
          stroke={isWhite ? '#94a3b8' : '#475569'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 56 26 C 53 35 55 45 58 55"
          stroke={isWhite ? '#94a3b8' : '#475569'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Eye */}
        <circle
          cx="42"
          cy="34"
          r="2.5"
          fill={isWhite ? '#0284c7' : '#f59e0b'}
        />

        {/* Muzzle / Nostril */}
        <ellipse
          cx="27"
          cy="47"
          rx="1.5"
          ry="2"
          fill={isWhite ? '#94a3b8' : '#475569'}
        />
      </g>
    </svg>
  );
};

