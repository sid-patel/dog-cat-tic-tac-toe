import React from 'react';
import { GameState, Player } from '../types';
import { Volume2, VolumeX, Home } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
  onEndGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

// Updated dog winner GIF URL
const DOG_WINNER_GIF = "http://dl5.glitter-graphics.net/pub/3708/3708335ivth24bk2y.gif";
const CAT_WINNER_GIF = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHNzejJ1YXF2MDA5am1hcWpjOG9scGFkdXo3ZjZjaDRsczJlbnUzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPAvJNgLDQL8qBSuxl/giphy.gif";

const GameStatus: React.FC<GameStatusProps> = ({ 
  gameState, 
  onReset, 
  onEndGame,
  soundEnabled, 
  onToggleSound 
}) => {
  const { currentPlayer, gameOver, winner } = gameState;
  
  const currentPlayerName = currentPlayer === 'dog' 
    ? gameState.dogPlayer.name 
    : gameState.catPlayer.name;
    
  const renderStatusMessage = () => {
    if (gameOver) {
      if (winner === 'tie') {
        return (
          <div className="text-center mb-4">
            <p className="text-xl font-bold mb-2">It's a tie!</p>
            <p className="text-gray-700">Both players get 10 bonus dollars!</p>
          </div>
        );
      }
      
      const winnerName = winner === 'dog' 
        ? gameState.dogPlayer.name 
        : gameState.catPlayer.name;
        
      const winnerEmoji = winner === 'dog' ? '🐶' : '🐱';
      
      return (
        <div className="text-center mb-4">
          <p className="text-xl font-bold mb-2">
            {winnerEmoji} {winnerName} wins! {winnerEmoji}
          </p>
          <div className="w-full max-w-xs mx-auto my-4">
            <img 
              src={winner === 'dog' ? DOG_WINNER_GIF : CAT_WINNER_GIF} 
              alt={`${winnerName} wins!`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      );
    }
    
    return (
      <p className="text-center text-lg font-medium mb-4">
        Current turn: {currentPlayer === 'dog' ? '🐶' : '🐱'} {currentPlayerName}
        {gameState[`${currentPlayer}Player`].isAI && ' (AI)'}
      </p>
    );
  };
  
  return (
    <div className="my-4">
      {renderStatusMessage()}
      
      <div className="flex justify-center space-x-4">
        {gameOver && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        )}
        
        <button
          onClick={onEndGame}
          className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          <Home size={20} className="inline-block mr-2" />
          End Game
        </button>
        
        <button
          onClick={onToggleSound}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
    </div>
  );
};

export default GameStatus;