import { z } from 'zod';

export const PieceSchema = z.object({
  type: z.enum(['p', 'r', 'n', 'b', 'q', 'k']),
  color: z.enum(['w', 'b']),
  position: z.object({
    row: z.number(),
    col: z.number()
  })
});

export const BoardSchema = z.object({
  pieces: z.array(PieceSchema),
  missingSquares: z.array(z.object({
    row: z.number(),
    col: z.number()
  })),
  size: z.number()
});

export const PuzzleSchema = z.object({
  id: z.string(),
  board: BoardSchema,
  movesToCheckmate: z.number(),
  difficulty: z.number()
});

export type Piece = z.infer<typeof PieceSchema>;
export type Board = z.infer<typeof BoardSchema>;
export type Puzzle = z.infer<typeof PuzzleSchema>;
