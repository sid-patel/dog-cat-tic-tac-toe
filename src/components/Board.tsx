import React from 'react';
import Square from './Square';
import { SquareValue } from '../types';

interface BoardProps {
  board: SquareValue[][];
  onSquareClick: (row: number, col: number) => void;
  connectedSquares: [number, number][] | null;
}

const Board: React.FC<BoardProps> = ({ board, onSquareClick, connectedSquares }) => {
  const isSquareHighlighted = (row: number, col: number) => {
    return connectedSquares?.some(([r, c]) => r === row && c === col) ?? false;
  };

  return (
    <div className="grid grid-cols-5 gap-1 bg-blue-100 p-2 rounded-lg shadow-md w-full max-w-md mx-auto">
      {board.map((row, rowIndex) => (
        row.map((square, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={square}
            onClick={() => onSquareClick(rowIndex, colIndex)}
            highlight={isSquareHighlighted(rowIndex, colIndex)}
          />
        ))
      ))}
    </div>
  );
};

export default Board;