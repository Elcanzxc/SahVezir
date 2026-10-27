export type Column = 'a' | 'b' | 'c';
export type Row = 1 | 2 | 3;
export type SquareId = `${Column}${Row}`;

export type PieceType = 'queen' | 'knight';
export type PieceColor = 'white' | 'black';

export interface PieceState {
  id: string;
  type: PieceType;
  color: PieceColor;
  square: SquareId;
}

export type BoardState = Record<SquareId, PieceState | null>;

export interface MoveStep {
  from: SquareId;
  to: SquareId;
  pieceId: string;
}

export interface GameStats {
  moves: number;
  minMoves: number;
  isWon: boolean;
  history: MoveStep[];
}

