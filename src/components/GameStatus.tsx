import React from 'react';
import { GameState } from '../types';
import { Volume2, VolumeX, Home } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
  onEndGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  gameState, 
  onReset, 
  onEndGame,
  soundEnabled, 
  onToggleSound 
}) => {
  const { currentPlayer, gameOver, winner } = gameState;
  
  const currentPlayerName = currentPlayer === 'player1' 
    ? gameState.player1.name 
    : gameState.player2.name;
    
  const renderStatusMessage = () => {
    if (gameOver) {
      if (winner === 'tie') {
        return (
          <div className="text-center mb-4">
            <p className="text-xl font-bold mb-2 text-amber-100">It's a tie!</p>
            <p className="text-amber-200">Both players get 10 bonus dollars!</p>
          </div>
        );
      }
      
      const winnerPlayer = winner === 'player1' ? gameState.player1 : gameState.player2;
      
      return (
        <div className="text-center mb-4">
          <p className="text-xl font-bold mb-2 text-amber-100">
            {winnerPlayer.emoji} {winnerPlayer.name} wins! {winnerPlayer.emoji}
          </p>
          <div className="text-6xl animate-bounce text-center my-4">
            {winnerPlayer.emoji}
          </div>
        </div>
      );
    }
    
    return (
      <p className="text-center text-lg font-medium mb-4 text-amber-100">
        Current turn: {gameState[currentPlayer].emoji} {currentPlayerName}
        {gameState[currentPlayer].isAI && ' (AI)'}
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
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            Play Again
          </button>
        )}
        
        <button
          onClick={onEndGame}
          className="px-4 py-2 bg-amber-800/80 text-white font-medium rounded-md hover:bg-amber-900/80 transition-colors"
        >
          <Home size={20} className="inline-block mr-2" />
          End Game
        </button>
        
        <button
          onClick={onToggleSound}
          className="p-2 bg-amber-800/80 rounded-full hover:bg-amber-900/80 transition-colors"
          aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
        </button>
      </div>
    </div>
  );
};

export default GameStatus;