import type { Board, Puzzle, Position } from "./types";
import { apiRequest } from "./queryClient";

// Update to use the working test endpoint
export async function fetchPuzzles(difficulty?: number): Promise<Puzzle[]> {
  const params = new URLSearchParams();
  if (difficulty) {
    params.append("difficulty", difficulty.toString());
  }

  const res = await fetch(`/api/gettest/puzzles${params.toString() ? '?' + params.toString() : ''}`);
  const data = await res.json();
  return data.puzzles;
}

export async function fetchDailyPuzzle(): Promise<Puzzle> {
  const res = await fetch('/api/gettest/daily');
  const data = await res.json();
  return data.puzzle;
}

export async function analyzePuzzle(board: Board, maxDepth: number = 3) {
  const res = await apiRequest("POST", `/api/chess/analyze`, {
    board,
    maxDepth,
    attackingColor: "w",
  });
  const data = await res.json();
  return data.analysis;
}

export async function savePuzzle(
  board: Board,
  analysis: any,
  difficulty: number,
) {
  const res = await apiRequest("POST", `/api/chess/save-puzzle`, {
    board,
    analysis,
    difficulty,
  });
  return res.json();
}

export function squareToPosition(square: string): Position {
  const col = square.charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(square[1]);
  return { row, col };
}

export function positionToSquare(pos: Position): string {
  const col = String.fromCharCode("a".charCodeAt(0) + pos.col);
  const row = 8 - pos.row;
  return `${col}${row}`;
}