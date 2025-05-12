import React from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import GameStatus from './GameStatus';
import SetupForm from './SetupForm';
import Rules from './Rules';
import useGameState from '../hooks/useGameState';
import { SetupFormValues } from '../types';

const Game: React.FC = () => {
  const { 
    gameState, 
    initGame, 
    resetGame, 
    handleMove,
    soundEnabled,
    setSoundEnabled,
    endGame
  } = useGameState();
  
  const handleSetupSubmit = (values: SetupFormValues) => {
    initGame(values);
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const handleEndGame = () => {
    endGame();
  };
  
  if (!gameState) {
    return (
      <div className="min-h-screen bg-blue-50 py-8 px-4">
        <SetupForm onSubmit={handleSetupSubmit} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          🐶 vs 🐱 Tic Tac Toe - Board {gameState.boardsFilled + 1}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PlayerInfo 
            player={gameState.dogPlayer}
            type="dog"
            isCurrentPlayer={gameState.currentPlayer === 'dog'}
          />
          
          <div className="flex items-center justify-center">
            <div className="bg-white px-6 py-3 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-center">
                Difficulty: {gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}
              </p>
            </div>
          </div>
          
          <PlayerInfo 
            player={gameState.catPlayer}
            type="cat"
            isCurrentPlayer={gameState.currentPlayer === 'cat'}
          />
        </div>
        
        <GameStatus 
          gameState={gameState}
          onReset={resetGame}
          onEndGame={handleEndGame}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
        
        <Board 
          board={gameState.board} 
          onSquareClick={handleMove}
          connectedSquares={gameState.connectedSquares}
        />
        
        <Rules />
      </div>
    </div>
  );
};

export default Game;