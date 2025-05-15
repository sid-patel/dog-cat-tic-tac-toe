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
      <div className="min-h-screen py-4 px-3 md:py-8 md:px-4">
        <SetupForm onSubmit={handleSetupSubmit} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-4 px-3 md:py-8 md:px-4 safe-area-inset">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-amber-100">
          Tic Tac Toe Forest Squad - Board {gameState.boardsFilled + 1}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
          <PlayerInfo 
            player={gameState.player1}
            isCurrentPlayer={gameState.currentPlayer === 'player1'}
          />
          
          <div className="flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md">
              <p className="text-base md:text-lg font-semibold text-center text-amber-900">
                Difficulty: {gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}
              </p>
            </div>
          </div>
          
          <PlayerInfo 
            player={gameState.player2}
            isCurrentPlayer={gameState.currentPlayer === 'player2'}
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