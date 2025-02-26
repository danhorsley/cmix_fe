import { useState } from 'react';
import { ChessBoard } from './ChessBoard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { analyzePuzzle, savePuzzle } from '@/lib/chess';
import { Board, Position } from '@/lib/types';

const INITIAL_BOARD: Board = {
  pieces: [],
  missingSquares: [],
  size: 8
};

export function PuzzleEditor() {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [difficulty, setDifficulty] = useState(1);
  const { toast } = useToast();

  async function handleAnalyze() {
    try {
      const analysis = await analyzePuzzle(board);
      if (analysis.hasMate) {
        const result = await savePuzzle(board, analysis, difficulty);
        toast({
          title: "Puzzle Saved!",
          description: `Created puzzle #${result.id}`
        });
      } else {
        toast({
          title: "No Mate Found",
          description: "Try a different position",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze position",
        variant: "destructive"
      });
    }
  }

  function toggleMissingSquare(pos: Position) {
    const idx = board.missingSquares.findIndex(
      s => s.row === pos.row && s.col === pos.col
    );
    
    if (idx >= 0) {
      setBoard({
        ...board,
        missingSquares: board.missingSquares.filter((_, i) => i !== idx)
      });
    } else {
      setBoard({
        ...board,
        missingSquares: [...board.missingSquares, pos]
      });
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Board Position</Label>
              <ChessBoard
                board={board}
                onMove={(from, to) => {
                  // Handle piece movement
                }}
              />
            </div>

            <Button onClick={handleAnalyze}>
              Analyze Position
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
