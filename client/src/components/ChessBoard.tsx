import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Board, Position } from '@/lib/types';
import { squareToPosition, positionToSquare } from '@/lib/chess';

interface ChessBoardProps {
  board: Board;
  onMove?: (from: Position, to: Position) => void;
  orientation?: 'white' | 'black';
  disabled?: boolean;
}

export function ChessBoard({ board, onMove, orientation = 'white', disabled = false }: ChessBoardProps) {
  const customSquareStyles: Record<string, React.CSSProperties> = {};

  // Style missing squares
  board.missingSquares.forEach(pos => {
    const square = positionToSquare(pos);
    customSquareStyles[square] = {
      backgroundColor: '#ddd',
      opacity: 0.8,
      pointerEvents: 'none'
    };
  });

  // Convert board position to FEN
  const piecePositions: Record<string, string> = {};
  board.pieces.forEach(piece => {
    const square = positionToSquare(piece.position);
    piecePositions[square] = `${piece.color}${piece.type.toUpperCase()}`;
  });

  function handleMove(from: string, to: string) {
    if (onMove && !disabled) {
      onMove(squareToPosition(from), squareToPosition(to));
      return true;
    }
    return false;
  }

  return (
    <div className="w-full max-w-[600px] aspect-square">
      <Chessboard 
        position={piecePositions}
        onPieceDrop={handleMove}
        customSquareStyles={customSquareStyles}
        boardOrientation={orientation}
        boardWidth={600}
        arePiecesDraggable={!disabled}
      />
    </div>
  );
}