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
      className={`w-full h-full aspect-square flex items-center justify-center text-3xl sm:text-4xl 
        font-bold transition-all duration-200 border border-gray-300 
        ${highlight ? 'bg-yellow-200 animate-pulse' : 'bg-white hover:bg-gray-100'}
        ${value ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value === 'dog' && (
        <span className={`transform transition-transform duration-300 ${highlight ? 'scale-150' : 'scale-125'}`}>
          🐶
        </span>
      )}
      {value === 'cat' && (
        <span className={`transform transition-transform duration-300 ${highlight ? 'scale-150' : 'scale-125'}`}>
          🐱
        </span>
      )}
    </button>
  );
};

export default Square;