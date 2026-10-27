import { SquareId, PieceType, PieceState, BoardState, MoveStep, Column, Row } from '../types';

export const ALL_SQUARES: SquareId[] = [
  'a3', 'b3', 'c3',
  'a2', 'b2', 'c2',
  'a1', 'b1', 'c1',
];

export const COLUMNS: Column[] = ['a', 'b', 'c'];
export const ROWS: Row[] = [3, 2, 1]; // display top to bottom

export const SQUARE_COORDINATES: Record<SquareId, { x: number; y: number }> = {
  a1: { x: 0, y: 0 },
  b1: { x: 1, y: 0 },
  c1: { x: 2, y: 0 },
  a2: { x: 0, y: 1 },
  b2: { x: 1, y: 1 },
  c2: { x: 2, y: 1 },
  a3: { x: 0, y: 2 },
  b3: { x: 1, y: 2 },
  c3: { x: 2, y: 2 },
};

export const COORDINATES_TO_SQUARE: Record<string, SquareId> = {
  '0,0': 'a1',
  '1,0': 'b1',
  '2,0': 'c1',
  '0,1': 'a2',
  '1,1': 'b2',
  '2,1': 'c2',
  '0,2': 'a3',
  '1,2': 'b3',
  '2,2': 'c3',
};

export function getInitialPieces(type: PieceType): PieceState[] {
  return [
    { id: 'w1', type, color: 'white', square: 'a1' },
    { id: 'w2', type, color: 'white', square: 'c1' },
    { id: 'b1', type, color: 'black', square: 'a3' },
    { id: 'b2', type, color: 'black', square: 'c3' },
  ];
}

export function createBoardState(pieces: PieceState[]): BoardState {
  const board: BoardState = {
    a1: null, b1: null, c1: null,
    a2: null, b2: null, c2: null,
    a3: null, b3: null, c3: null,
  };

  for (const piece of pieces) {
    board[piece.square] = piece;
  }

  return board;
}

/**
 * Validates whether a move from `from` to `to` is valid according to chess rules
 * and puzzle constraints (target square must be empty, no captures allowed).
 */
export function isValidMove(
  from: SquareId,
  to: SquareId,
  pieceType: PieceType,
  boardState: BoardState
): boolean {
  if (from === to) return false;

  // Rule 1: Destination cell must be empty (pieces cannot capture each other)
  if (boardState[to] !== null) return false;

  // Source cell must contain a piece
  if (boardState[from] === null) return false;

  const fromCoord = SQUARE_COORDINATES[from];
  const toCoord = SQUARE_COORDINATES[to];

  const dx = Math.abs(toCoord.x - fromCoord.x);
  const dy = Math.abs(toCoord.y - fromCoord.y);

  if (pieceType === 'knight') {
    // Knight moves in an L-shape: (1, 2) or (2, 1)
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }

  if (pieceType === 'queen') {
    const isHorizontal = dy === 0 && dx > 0;
    const isVertical = dx === 0 && dy > 0;
    const isDiagonal = dx === dy && dx > 0;

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return false;
    }

    // Queen cannot jump over other pieces.
    // If distance is 2, check intermediate cell.
    const dist = Math.max(dx, dy);
    if (dist === 2) {
      const midX = (fromCoord.x + toCoord.x) / 2;
      const midY = (fromCoord.y + toCoord.y) / 2;
      const midSquare = COORDINATES_TO_SQUARE[`${midX},${midY}`];
      if (midSquare && boardState[midSquare] !== null) {
        return false; // Intermediate cell is blocked
      }
    }

    return true;
  }

  return false;
}

/**
 * Returns all reachable squares for a given square and piece type
 */
export function getValidMoves(
  from: SquareId,
  pieceType: PieceType,
  boardState: BoardState
): SquareId[] {
  return ALL_SQUARES.filter((square) =>
    isValidMove(from, square, pieceType, boardState)
  );
}

/**
 * Checks if the win condition is met:
 * White pieces must occupy a3 and c3.
 * Black pieces must occupy a1 and c1.
 */
export function checkWinCondition(boardState: BoardState): boolean {
  const pA3 = boardState['a3'];
  const pC3 = boardState['c3'];
  const pA1 = boardState['a1'];
  const pC1 = boardState['c1'];

  const whiteWon =
    pA3 !== null && pA3.color === 'white' &&
    pC3 !== null && pC3.color === 'white';

  const blackWon =
    pA1 !== null && pA1.color === 'black' &&
    pC1 !== null && pC1.color === 'black';

  return whiteWon && blackWon;
}

/**
 * Auto-solve sequence for Queen puzzle (6 moves):
 * a3->b2, a1->a3, b2->a1, c3->b2, c1->c3, b2->c1
 */
export const QUEEN_SOLUTION_MOVES: Omit<MoveStep, 'pieceId'>[] = [
  { from: 'a3', to: 'b2' },
  { from: 'a1', to: 'a3' },
  { from: 'b2', to: 'a1' },
  { from: 'c3', to: 'b2' },
  { from: 'c1', to: 'c3' },
  { from: 'b2', to: 'c1' },
];

/**
 * Auto-solve sequence for Knight puzzle (Guarini's puzzle, 16 moves):
 * Moving each knight 4 steps clockwise along the 8-cycle:
 * a1->b3->c1->a2->c3->b1->a3->c2->a1
 */
export const KNIGHT_SOLUTION_MOVES: Omit<MoveStep, 'pieceId'>[] = [
  // Round 1 (each knight takes step 1)
  { from: 'a1', to: 'b3' },
  { from: 'a3', to: 'c2' },
  { from: 'c3', to: 'b1' },
  { from: 'c1', to: 'a2' },

  // Round 2 (each knight takes step 2)
  { from: 'b3', to: 'c1' },
  { from: 'c2', to: 'a1' },
  { from: 'b1', to: 'a3' },
  { from: 'a2', to: 'c3' },

  // Round 3 (each knight takes step 3)
  { from: 'c1', to: 'a2' },
  { from: 'a1', to: 'b3' },
  { from: 'a3', to: 'c2' },
  { from: 'c3', to: 'b1' },

  // Round 4 (each knight takes step 4)
  { from: 'a2', to: 'c3' },
  { from: 'b3', to: 'c1' },
  { from: 'c2', to: 'a1' },
  { from: 'b1', to: 'a3' },
];

/**
 * Checks if a square is light or dark in standard chess
 * (col + row) is even or odd
 */
export function isLightSquare(square: SquareId): boolean {
  const coord = SQUARE_COORDINATES[square];
  return (coord.x + coord.y) % 2 !== 0;
}

