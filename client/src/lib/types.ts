import type { Board, Piece, Puzzle } from '@shared/schema';

export interface Position {
  row: number;
  col: number;
}

export interface ChessMove {
  from: Position;
  to: Position;
  notation: string;
}

export interface PuzzleAnalysis {
  hasMate: boolean;
  movesToMate: number;
  mateSequence: ChessMove[];
}

export type { Board, Piece, Puzzle };