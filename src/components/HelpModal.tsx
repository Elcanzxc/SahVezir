import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Flame, Target, Compass, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto border rounded-3xl p-6 shadow-2xl transition-colors duration-200 ${
            isDark
              ? 'bg-slate-900 border-slate-700/80 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-5 right-5 p-1.5 rounded-xl transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            {t.helpTitle}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
            {/* Goal */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark
                  ? 'bg-slate-950/70 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="font-semibold flex items-center gap-2 mb-1.5">
                <Target className="w-4 h-4 text-emerald-500" />
                {t.mainGoalTitle}
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                {t.mainGoalDesc}
              </p>
            </div>

            {/* Restrictions */}
            <div
              className={`p-3.5 rounded-2xl border space-y-1 ${
                isDark
                  ? 'bg-slate-950/70 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="font-semibold mb-1.5">{t.rulesTitle}</h3>
              <ul
                className={`list-disc list-inside space-y-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>{t.rule1}</li>
                <li>{t.rule2}</li>
                <li>{t.rule3}</li>
              </ul>
            </div>

            {/* Mode 1: Queens */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/20'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <h3 className="font-semibold text-amber-600 dark:text-amber-300 flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-amber-500" />
                {t.queensMode}
              </h3>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {t.queensRuleDesc}
                <br />
                <span className="font-mono text-[11px] text-amber-500 font-semibold block mt-1">
                  a3→b2, a1→a3, b2→a1, c3→b2, c1→c3, b2→c1
                </span>
              </p>
            </div>

            {/* Mode 2: Knights */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark
                  ? 'bg-indigo-500/10 border-indigo-500/20'
                  : 'bg-indigo-50/70 border-indigo-200'
              }`}
            >
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-indigo-500" />
                {t.knightsMode}
              </h3>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {t.knightsRuleDesc}
                <br />
                <span className="font-mono text-[11px] text-indigo-500 font-semibold block my-1">
                  a1 → b3 → c1 → a2 → c3 → b1 → a3 → c2 → a1
                </span>
              </p>
            </div>

            {/* Question: "Is there only 1 solution?" */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark
                  ? 'bg-sky-500/10 border-sky-500/20 text-slate-300'
                  : 'bg-sky-50/70 border-sky-200 text-slate-700'
              }`}
            >
              <h3 className="font-semibold text-sky-600 dark:text-sky-300 flex items-center gap-2 mb-1.5">
                <HelpCircle className="w-4 h-4 text-sky-500" />
                {t.uniquenessTitle}
              </h3>
              <p className="text-xs mb-2 font-medium">{t.uniquenessIntro}</p>
              <ul className="text-xs space-y-1.5 list-disc list-inside opacity-90">
                <li>{t.uniquenessQueens}</li>
                <li>{t.uniquenessKnights}</li>
                <li>{t.uniquenessSuboptimal}</li>
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {t.understoodBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
