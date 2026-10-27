import { useState, useCallback, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  PieceType,
  PieceState,
  SquareId,
  BoardState,
} from '../types';
import {
  getInitialPieces,
  createBoardState,
  getValidMoves,
  checkWinCondition,
  QUEEN_SOLUTION_MOVES,
  KNIGHT_SOLUTION_MOVES,
} from '../utils/chessLogic';

export function useChessPuzzle() {
  const [mode, setMode] = useState<PieceType>('queen');
  const [pieces, setPieces] = useState<PieceState[]>(() => getInitialPieces('queen'));
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [solveSpeed, setSolveSpeed] = useState<number>(600); // 600ms default
  const [lastMove, setLastMove] = useState<{ from: SquareId; to: SquareId } | null>(null);
  const [history, setHistory] = useState<PieceState[][]>([]);

  // Ref to cancel auto-solve timer if unmounted or reset
  const solveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const boardState: BoardState = createBoardState(pieces);

  const minMoves = mode === 'queen' ? 6 : 16;

  // Selected piece object
  const selectedPiece = pieces.find((p) => p.id === selectedPieceId) || null;

  // Valid target squares for currently selected piece
  const validMoves: SquareId[] = selectedPiece
    ? getValidMoves(selectedPiece.square, selectedPiece.type, boardState)
    : [];

  const stopAutoSolve = useCallback(() => {
    if (solveTimeoutRef.current) {
      clearTimeout(solveTimeoutRef.current);
      solveTimeoutRef.current = null;
    }
    setIsSolving(false);
  }, []);

  // Reset current board to initial state
  const resetBoard = useCallback((newMode?: PieceType) => {
    stopAutoSolve();
    const currentMode = newMode || mode;
    const initial = getInitialPieces(currentMode);
    setPieces(initial);
    setSelectedPieceId(null);
    setMoveCount(0);
    setIsWon(false);
    setLastMove(null);
    setHistory([]);
  }, [mode, stopAutoSolve]);

  // Mode changer (resets the board as required)
  const changeMode = useCallback((newMode: PieceType) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetBoard(newMode);
  }, [mode, resetBoard]);

  // Trigger win confetti
  const triggerWinCelebration = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#34d399', '#f472b6', '#a78bfa'],
    });
  }, []);

  // Execute a move from current piece to destination square
  const executeMove = useCallback((pieceId: string, to: SquareId, isAutoMove = false) => {
    setPieces((prevPieces) => {
      const targetPiece = prevPieces.find((p) => p.id === pieceId);
      if (!targetPiece) return prevPieces;

      const from = targetPiece.square;
      const nextPieces = prevPieces.map((p) =>
        p.id === pieceId ? { ...p, square: to } : p
      );

      setLastMove({ from, to });
      if (!isAutoMove) {
        setHistory((prev) => [...prev, prevPieces]);
      }

      // Check win condition on the new board
      const newBoard = createBoardState(nextPieces);
      const won = checkWinCondition(newBoard);
      if (won) {
        setIsWon(true);
        triggerWinCelebration();
      }

      return nextPieces;
    });

    setMoveCount((prev) => prev + 1);
    setSelectedPieceId(null);
  }, [triggerWinCelebration]);

  // Handle user selecting a piece on the board
  const handleSelectPiece = useCallback((pieceId: string) => {
    if (isSolving || isWon) return;

    if (selectedPieceId === pieceId) {
      setSelectedPieceId(null); // toggle off
    } else {
      setSelectedPieceId(pieceId);
    }
  }, [isSolving, isWon, selectedPieceId]);

  // Handle user clicking a destination square
  const handleSquareClick = useCallback((targetSquare: SquareId) => {
    if (isSolving || isWon || !selectedPiece) return;

    if (validMoves.includes(targetSquare)) {
      executeMove(selectedPiece.id, targetSquare);
    } else {
      // If user clicked an invalid square, deselect
      setSelectedPieceId(null);
    }
  }, [isSolving, isWon, selectedPiece, validMoves, executeMove]);

  // Undo last move
  const undoLastMove = useCallback(() => {
    if (isSolving || history.length === 0) return;

    const previousState = history[history.length - 1];
    setPieces(previousState);
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setMoveCount((prev) => Math.max(0, prev - 1));
    setSelectedPieceId(null);
    setIsWon(false);
    setLastMove(null);
  }, [isSolving, history]);

  // Auto-solve execution
  const startAutoSolve = useCallback(() => {
    stopAutoSolve();

    // Reset board to initial state first so solution steps apply cleanly
    const currentMode = mode;
    const initial = getInitialPieces(currentMode);
    setPieces(initial);
    setSelectedPieceId(null);
    setMoveCount(0);
    setIsWon(false);
    setLastMove(null);
    setHistory([]);
    setIsSolving(true);

    const solutionSteps = currentMode === 'queen' ? QUEEN_SOLUTION_MOVES : KNIGHT_SOLUTION_MOVES;
    let stepIndex = 0;
    let currentPieces = initial;

    const runNextStep = () => {
      if (stepIndex >= solutionSteps.length) {
        setIsSolving(false);
        setIsWon(true);
        triggerWinCelebration();
        return;
      }

      const step = solutionSteps[stepIndex];
      const pieceToMove = currentPieces.find((p) => p.square === step.from);

      if (pieceToMove) {
        currentPieces = currentPieces.map((p) =>
          p.id === pieceToMove.id ? { ...p, square: step.to } : p
        );

        setPieces(currentPieces);
        setLastMove({ from: step.from, to: step.to });
        setMoveCount(stepIndex + 1);

        const newBoard = createBoardState(currentPieces);
        if (checkWinCondition(newBoard)) {
          setIsWon(true);
          triggerWinCelebration();
        }
      }

      stepIndex++;
      if (stepIndex < solutionSteps.length) {
        solveTimeoutRef.current = setTimeout(runNextStep, solveSpeed);
      } else {
        solveTimeoutRef.current = setTimeout(() => {
          setIsSolving(false);
        }, 300);
      }
    };

    // First step delay
    solveTimeoutRef.current = setTimeout(runNextStep, 350);
  }, [mode, solveSpeed, stopAutoSolve, triggerWinCelebration]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (solveTimeoutRef.current) {
        clearTimeout(solveTimeoutRef.current);
      }
    };
  }, []);

  return {
    mode,
    pieces,
    boardState,
    selectedPieceId,
    selectedPiece,
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
  };
}

