import React, { useState } from 'react';
import { GameDifficulty, SetupFormValues, Player } from '../types';

interface SetupFormProps {
  onSubmit: (values: SetupFormValues) => void;
}

const difficultyOptions: { value: GameDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy (20 dollars)' },
  { value: 'medium', label: 'Medium (15 dollars)' },
  { value: 'hard', label: 'Hard (10 dollars)' }
];

const SetupForm: React.FC<SetupFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<SetupFormValues>({
    dogName: 'Buddy',
    catName: 'Whiskers',
    difficulty: 'medium',
    gameMode: 'pvp'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'gameMode' && value === 'pvp' ? { playerRole: undefined } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">🐶 vs 🐱 Tic Tac Toe</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Game Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gameMode"
                value="pvp"
                checked={formValues.gameMode === 'pvp'}
                onChange={handleChange}
                className="mr-2"
              />
              Player vs Player
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gameMode"
                value="ai"
                checked={formValues.gameMode === 'ai'}
                onChange={handleChange}
                className="mr-2"
              />
              Play vs AI
            </label>
          </div>
        </div>

        {formValues.gameMode === 'ai' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Role
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="playerRole"
                  value="dog"
                  checked={formValues.playerRole === 'dog'}
                  onChange={(e) => setFormValues(prev => ({ ...prev, playerRole: e.target.value as Player }))}
                  className="mr-2"
                />
                Play as Dog 🐶
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="playerRole"
                  value="cat"
                  checked={formValues.playerRole === 'cat'}
                  onChange={(e) => setFormValues(prev => ({ ...prev, playerRole: e.target.value as Player }))}
                  className="mr-2"
                />
                Play as Cat 🐱
              </label>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="dogName" className="block text-sm font-medium text-gray-700 mb-1">
            🐶 Dog Name
          </label>
          <input
            type="text"
            id="dogName"
            name="dogName"
            value={formValues.dogName}
            onChange={handleChange}
            required
            maxLength={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="catName" className="block text-sm font-medium text-gray-700 mb-1">
            🐱 Cat Name
          </label>
          <input
            type="text"
            id="catName"
            name="catName"
            value={formValues.catName}
            onChange={handleChange}
            required
            maxLength={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formValues.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {difficultyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default SetupForm;