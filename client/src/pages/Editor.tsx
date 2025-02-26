import { PuzzleEditor } from '@/components/PuzzleEditor';

export default function Editor() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold">Create New Puzzle</h1>
      <PuzzleEditor />
    </div>
  );
}
