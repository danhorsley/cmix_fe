import { useQuery } from "@tanstack/react-query";
import { fetchDailyPuzzle } from "@/lib/chess";
import { ChessBoard } from "@/components/ChessBoard";
import { PuzzleControls } from "@/components/PuzzleControls";
import { MoveHistory } from "@/components/MoveHistory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { CalendarDays, BookOpen, Edit3 } from "lucide-react";
import type { ChessMove, Puzzle } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const [moves, setMoves] = useState<ChessMove[]>([]);

  const {
    data: dailyPuzzle,
    isLoading,
    error,
  } = useQuery<Puzzle>({
    queryKey: ["daily-puzzle"],
    queryFn: fetchDailyPuzzle,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[400px] bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !dailyPuzzle) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Error Loading Puzzle</h2>
          <p className="text-muted-foreground">
            Unable to load the daily puzzle. Please try again later.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">ChessMate Puzzles</h1>

        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/browse">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Puzzles
            </Link>
          </Button>
          <Button asChild>
            <Link href="/editor">
              <Edit3 className="w-4 h-4 mr-2" />
              Create Puzzle
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="w-5 h-5" />
            Daily Puzzle
          </div>

          <ChessBoard
            board={dailyPuzzle.board}
            onMove={(from, to) => {
              setMoves([
                ...moves,
                {
                  from,
                  to,
                  notation: `${from.row}${from.col}-${to.row}${to.col}`,
                },
              ]);
            }}
          />
        </div>

        <div className="space-y-4">
          <PuzzleControls
            difficulty={dailyPuzzle.difficulty}
            movesToMate={dailyPuzzle.movesToCheckmate}
            onReset={() => {
              setMoves([]);
            }}
            onHint={() => {
              // Show hint
              console.log("Show hint");
            }}
          />

          <MoveHistory moves={moves} />
        </div>
      </div>
    </div>
  );
}
