import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useChessPuzzle } from './hooks/useChessPuzzle';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { VictoryModal } from './components/VictoryModal';
import { HelpModal } from './components/HelpModal';

const MainGame: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const {
    mode,
    pieces,
    selectedPieceId,
    validMoves,
    moveCount,
    minMoves,
    isWon,
    isSolving,
    solveSpeed,
    lastMove,
    history,
    setSolveSpeed,
    changeMode,
    resetBoard,
    handleSelectPiece,
    handleSquareClick,
    undoLastMove,
    startAutoSolve,
    stopAutoSolve,
  } = useChessPuzzle();

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${
        isDark
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-100/90 text-slate-800'
      }`}
    >
      {/* App Header */}
      <Header onOpenHelp={() => setIsHelpOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 max-w-5xl w-full">
          {/* Left / Center: Board */}
          <div className="flex flex-col items-center">
            <Board
              pieces={pieces}
              selectedPieceId={selectedPieceId}
              validMoves={validMoves}
              lastMove={lastMove}
              isSolving={isSolving}
              onSelectPiece={handleSelectPiece}
              onSquareClick={handleSquareClick}
            />
          </div>

          {/* Right: Controls & Info */}
          <div className="w-full max-w-md flex flex-col items-center">
            <Controls
              mode={mode}
              moveCount={moveCount}
              minMoves={minMoves}
              isWon={isWon}
              isSolving={isSolving}
              canUndo={history.length > 0}
              solveSpeed={solveSpeed}
              onChangeMode={changeMode}
              onReset={() => resetBoard()}
              onUndo={undoLastMove}
              onStartAutoSolve={startAutoSolve}
              onStopAutoSolve={stopAutoSolve}
              onSpeedChange={setSolveSpeed}
            />
          </div>
        </div>
      </main>

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isWon}
        mode={mode}
        moves={moveCount}
        minMoves={minMoves}
        onReset={() => resetBoard()}
        onSwitchMode={(nextMode) => changeMode(nextMode)}
      />

      {/* Help & Rules Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainGame />
    </AppProvider>
  );
};

export default App;
