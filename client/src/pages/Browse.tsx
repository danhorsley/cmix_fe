import { useState } from 'react';
import { PuzzleBrowser } from '@/components/PuzzleBrowser';
import { ChessBoard } from '@/components/ChessBoard';
import { PuzzleControls } from '@/components/PuzzleControls';
import { MoveHistory } from '@/components/MoveHistory';
import { Puzzle } from '@shared/schema';

export default function Browse() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold">Browse Puzzles</h1>

      {selectedPuzzle ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ChessBoard
              board={selectedPuzzle.board}
              onMove={(from, to) => {
                // Handle moves
              }}
            />
          </div>

          <div className="space-y-4">
            <PuzzleControls
              difficulty={selectedPuzzle.difficulty}
              movesToMate={selectedPuzzle.movesToCheckmate}
              onReset={() => setSelectedPuzzle(null)}
            />
            
            <MoveHistory moves={[]} />
          </div>
        </div>
      ) : (
        <PuzzleBrowser onSelectPuzzle={setSelectedPuzzle} />
      )}
    </div>
  );
}
