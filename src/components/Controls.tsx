import React from 'react';
import {
  RotateCcw,
  Play,
  Square as StopIcon,
  Undo2,
  Crown,
  Info,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { PieceType } from '../types';
import { useApp } from '../context/AppContext';

interface ControlsProps {
  mode: PieceType;
  moveCount: number;
  minMoves: number;
  isWon: boolean;
  isSolving: boolean;
  canUndo: boolean;
  solveSpeed: number;
  onChangeMode: (mode: PieceType) => void;
  onReset: () => void;
  onUndo: () => void;
  onStartAutoSolve: () => void;
  onStopAutoSolve: () => void;
  onSpeedChange: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  mode,
  moveCount,
  minMoves,
  isWon,
  isSolving,
  canUndo,
  solveSpeed,
  onChangeMode,
  onReset,
  onUndo,
  onStartAutoSolve,
  onStopAutoSolve,
  onSpeedChange,
}) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';
  const isOptimal = isWon && moveCount === minMoves;

  return (
    <div
      className={`flex flex-col gap-4 w-full max-w-md p-5 rounded-3xl border shadow-xl backdrop-blur-md transition-colors duration-200 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-black/40'
          : 'bg-white/90 border-slate-200 text-slate-800 shadow-slate-200/60'
      }`}
    >
      {/* Mode Switcher */}
      <div>
        <label
          className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t.gameMode}
        </label>
        <div
          className={`grid grid-cols-2 gap-2 p-1.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-950 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            disabled={isSolving}
            onClick={() => onChangeMode('queen')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              mode === 'queen'
                ? isDark
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-500/10'
                  : 'bg-white text-amber-700 border border-amber-400 shadow-sm font-semibold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            } ${isSolving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span>{t.queensMode}</span>
          </button>

          <button
            type="button"
            disabled={isSolving}
            onClick={() => onChangeMode('knight')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              mode === 'knight'
                ? isDark
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-md shadow-indigo-500/10'
                  : 'bg-white text-indigo-700 border border-indigo-400 shadow-sm font-semibold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            } ${isSolving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Flame className="w-4 h-4 text-indigo-500" />
            <span>{t.knightsMode}</span>
          </button>
        </div>
      </div>

      {/* Move Counter & Stats Card */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between ${
          isDark
            ? 'bg-slate-950/60 border-slate-800/80'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div>
          <div
            className={`text-xs font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t.moveCounter}
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span
              className={`text-3xl font-extrabold font-mono ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {moveCount}
            </span>
            <span
              className={`text-sm font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              / {t.goal}: <span className="text-amber-500 font-bold">{minMoves}</span>
            </span>
          </div>
        </div>

        {/* Win / In-Progress Status Badge */}
        {isWon ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-xs font-semibold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {isOptimal ? t.statusOptimal : t.statusVictory}
          </div>
        ) : (
          <div className="text-right">
            <span
              className={`text-xs font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {moveCount === 0
                ? t.statusStart
                : moveCount <= minMoves
                ? t.statusOnTrack
                : t.statusOverGoal(moveCount - minMoves)}
            </span>
          </div>
        )}
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Auto-Solve Button */}
        {isSolving ? (
          <button
            type="button"
            onClick={onStopAutoSolve}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm bg-rose-500/20 hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 border border-rose-500/40 shadow-lg transition-all"
          >
            <StopIcon className="w-4 h-4 fill-current" />
            {t.stopBtn}
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartAutoSolve}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            {t.solveBtn}
          </button>
        )}

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm border shadow-md transition-all active:scale-[0.98] ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          {t.resetBtn}
        </button>
      </div>

      {/* Secondary Controls (Undo & Speed) */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          disabled={!canUndo || isSolving}
          onClick={onUndo}
          className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
            canUndo && !isSolving
              ? isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-slate-900'
              : isDark
              ? 'bg-slate-900/40 text-slate-600 border-slate-800/60 cursor-not-allowed'
              : 'bg-slate-100/50 text-slate-400 border-slate-200 cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-3.5 h-3.5" />
          {t.undoBtn}
        </button>

        {/* Speed options for Auto-Solve */}
        <div
          className={`flex items-center gap-1 text-xs p-1 rounded-xl border ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-slate-400'
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          <span className="px-1 text-[11px] opacity-75">{t.speedLabel}</span>
          {[
            { label: '1x', val: 600 },
            { label: '1.5x', val: 400 },
            { label: '2x', val: 250 },
          ].map((sp) => (
            <button
              key={sp.val}
              type="button"
              onClick={() => onSpeedChange(sp.val)}
              className={`px-2 py-0.5 rounded-lg font-mono text-[11px] transition-colors ${
                solveSpeed === sp.val
                  ? isDark
                    ? 'bg-slate-800 text-amber-400 font-bold'
                    : 'bg-white text-amber-600 font-bold shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules & Goal description card */}
      <div
        className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
          isDark
            ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div
            className={`font-semibold ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}
          >
            {mode === 'queen' ? t.queensRuleTitle : t.knightsRuleTitle}
          </div>
          <p>{mode === 'queen' ? t.queensRuleDesc : t.knightsRuleDesc}</p>
        </div>
      </div>
    </div>
  );
};
