import React from 'react';
import { Crown, HelpCircle, Sun, Moon, Languages } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  const { t, theme, toggleTheme, language, toggleLanguage } = useApp();

  const isDark = theme === 'dark';

  return (
    <header
      className={`w-full flex items-center justify-between py-3 px-4 sm:px-6 border-b transition-colors duration-200 ${
        isDark
          ? 'border-slate-800/80 bg-slate-950/70 text-slate-100'
          : 'border-slate-200 bg-white/80 text-slate-800 shadow-sm'
      } backdrop-blur-md`}
    >
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md shadow-amber-500/20">
          <Crown className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
            <span>{t.appTitle}</span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-slate-800 text-amber-400 border-slate-700'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {t.desktopEdition}
            </span>
          </h1>
          <p
            className={`text-xs hidden sm:block ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t.appSubtitle}
          </p>
        </div>
      </div>

      {/* Action Buttons: Language, Theme, Help */}
      <div className="flex items-center gap-2">
        {/* Language switch */}
        <button
          type="button"
          onClick={toggleLanguage}
          title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          <Languages className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono uppercase">{language}</span>
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Светлая тема / Light mode' : 'Темная тема / Dark mode'}
          className={`p-2 rounded-xl text-xs font-medium border transition-all ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Help modal button */}
        <button
          type="button"
          onClick={onOpenHelp}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-medium border transition-colors ${
            isDark
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-sky-500" />
          <span className="hidden sm:inline">{t.help}</span>
        </button>
      </div>
    </header>
  );
};
