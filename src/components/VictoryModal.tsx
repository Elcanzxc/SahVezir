import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { PieceType } from '../types';
import { useApp } from '../context/AppContext';

interface VictoryModalProps {
  isOpen: boolean;
  mode: PieceType;
  moves: number;
  minMoves: number;
  onReset: () => void;
  onSwitchMode: (nextMode: PieceType) => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  mode,
  moves,
  minMoves,
  onReset,
  onSwitchMode,
}) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const isOptimal = moves === minMoves;
  const nextMode: PieceType = mode === 'queen' ? 'knight' : 'queen';
  const nextModeName = nextMode === 'queen' ? t.queensName : t.knightsName;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className={`relative w-full max-w-sm p-6 rounded-3xl border shadow-2xl text-center ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/30 shadow-amber-500/10 text-slate-100'
              : 'bg-white border-amber-300 shadow-xl text-slate-800'
          }`}
        >
          {/* Trophy Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 mb-4 ring-1 ring-amber-400/40 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold">{t.victoryTitle}</h2>
          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.victoryDesc}
          </p>

          {/* Stats Box */}
          <div
            className={`my-5 p-4 rounded-2xl border flex items-center justify-around ${
              isDark
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t.movesMade}
              </div>
              <div
                className={`text-2xl font-bold font-mono mt-0.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {moves}
              </div>
            </div>
            <div
              className={`h-8 w-px ${
                isDark ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
            <div>
              <div
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t.minimum}
              </div>
              <div className="text-2xl font-bold font-mono text-amber-500 mt-0.5">
                {minMoves}
              </div>
            </div>
          </div>

          {/* Optimal Badge */}
          {isOptimal ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-semibold mb-6 border border-emerald-500/30">
              <Star className="w-3.5 h-3.5 fill-current" />
              {t.optimalBadge}
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-semibold mb-6 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t.goodBadge(minMoves)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              {t.playAgain}
            </button>

            <button
              type="button"
              onClick={() => onSwitchMode(nextMode)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm border transition-all active:scale-[0.98] ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <span>{t.switchToMode(nextModeName)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
