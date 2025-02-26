import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ChessMove } from '@/lib/types';

interface MoveHistoryProps {
  moves: ChessMove[];
  expectedMoves?: ChessMove[];
}

export function MoveHistory({ moves, expectedMoves }: MoveHistoryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full">
          <div className="space-y-2">
            {moves.map((move, i) => (
              <div 
                key={i}
                className={`flex items-center p-2 ${
                  expectedMoves && 
                  expectedMoves[i] && 
                  move.notation === expectedMoves[i].notation
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : ''
                }`}
              >
                <span className="font-mono w-8">{i + 1}.</span>
                <span className="font-bold">{move.notation}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
