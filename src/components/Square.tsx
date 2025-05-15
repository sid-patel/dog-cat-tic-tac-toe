import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  highlight?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, highlight = false }) => {
  return (
    <button
      className={`w-full h-full aspect-square flex items-center justify-center text-2xl md:text-4xl 
        font-bold transition-all duration-200 border border-amber-800/30
        ${highlight ? 'bg-yellow-200/90 animate-pulse' : 'bg-amber-50/90 hover:bg-amber-100/90'}
        ${value ? 'cursor-default' : 'cursor-pointer touch-manipulation'}`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value && (
        <span className={`transform transition-transform duration-300 ${highlight ? 'scale-150' : 'scale-125'}`}>
          {value}
        </span>
      )}
    </button>
  );
};

export default Square;