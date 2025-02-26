import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchPuzzles } from '@/lib/chess';
import { Puzzle } from '@shared/schema';
import { ChessBoard } from './ChessBoard';

interface PuzzleBrowserProps {
  onSelectPuzzle: (puzzle: Puzzle) => void;
}

export function PuzzleBrowser({ onSelectPuzzle }: PuzzleBrowserProps) {
  const [difficulty, setDifficulty] = useState<string>('all');

  const { data: puzzles, isLoading } = useQuery({
    queryKey: ['/api/chess/puzzles', difficulty],  // Updated to use full API path
    queryFn: () => fetchPuzzles(difficulty === 'all' ? undefined : parseInt(difficulty))
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {[1, 2, 3, 4, 5].map(d => (
              <SelectItem key={d} value={d.toString()}>Level {d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div>Loading puzzles...</div>
        ) : (
          puzzles?.map((puzzle: Puzzle) => (
            <Card key={puzzle.id} className="overflow-hidden">
              <div className="aspect-square w-full">
                <ChessBoard 
                  board={puzzle.board}
                  disabled={true}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Puzzle #{puzzle.id}</div>
                    <div className="text-sm text-muted-foreground">
                      Mate in {puzzle.movesToCheckmate}
                    </div>
                  </div>
                  <Button onClick={() => onSelectPuzzle(puzzle)}>
                    Solve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}