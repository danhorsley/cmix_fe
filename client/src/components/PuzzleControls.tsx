import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, RotateCcw, CheckCircle } from 'lucide-react';

interface PuzzleControlsProps {
  difficulty: number;
  movesToMate: number;
  onReset: () => void;
  onHint?: () => void;
  onSubmit?: () => void;
  solved?: boolean;
}

export function PuzzleControls({ 
  difficulty, 
  movesToMate, 
  onReset, 
  onHint, 
  onSubmit,
  solved 
}: PuzzleControlsProps) {
  const { toast } = useToast();

  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Badge>Difficulty {difficulty}</Badge>
            <Badge variant="secondary">Mate in {movesToMate}</Badge>
          </div>
          {solved && (
            <Badge className="bg-green-500 text-white flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Solved!
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          {onHint && (
            <Button 
              variant="secondary"
              onClick={() => {
                onHint();
                toast({
                  title: "Hint Revealed",
                  description: "Try to find the best move!"
                });
              }}
            >
              Show Hint
            </Button>
          )}

          {onSubmit && (
            <Button 
              onClick={onSubmit}
              className="flex items-center gap-2 ml-auto"
            >
              Check Solution
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}