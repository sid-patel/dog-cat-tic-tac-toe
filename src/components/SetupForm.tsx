import React, { useState } from 'react';
import { GameDifficulty, SetupFormValues, Player } from '../types';

interface SetupFormProps {
  onSubmit: (values: SetupFormValues) => void;
}

const difficultyOptions: { value: GameDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy (20 Moves)' },
  { value: 'medium', label: 'Medium (15 Moves)' },
  { value: 'hard', label: 'Hard (10 Moves)' }
];

const animalEmojis = [
  '🦁', '🐯', '🐶', '🐱', '🐘', '🐿️', '🐺', '🐼', '🐎', '🦋',
  '🦉', '🐬', '🦚', '🌳', '🦌', '🐠', '🐒', '🐰', '🐦', '🐤'
];

const SetupForm: React.FC<SetupFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<SetupFormValues>({
    player1Name: '',
    player1Emoji: '',
    player2Name: '',
    player2Emoji: '',
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
          Welcome to Tic Tac Toe Squad
        </h1>
        <p className="text-lg opacity-90">Created by Siddhant Patel</p>
      </div>
      
      <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Game Mode
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="flex items-center flex-1">
                <input
                  type="radio"
                  name="gameMode"
                  value="pvp"
                  checked={formValues.gameMode === 'pvp'}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5"
                />
                <span className="text-base">Player vs Player</span>
              </label>
              <label className="flex items-center flex-1">
                <input
                  type="radio"
                  name="gameMode"
                  value="ai"
                  checked={formValues.gameMode === 'ai'}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5"
                />
                <span className="text-base">Play vs AI</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player 1
              </label>
              <input
                type="text"
                name="player1Name"
                value={formValues.player1Name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                maxLength={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
              />
              <div className="grid grid-cols-5 gap-2">
                {animalEmojis.slice(0, 10).map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormValues(prev => ({ ...prev, player1Emoji: emoji }))}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      formValues.player1Emoji === emoji
                        ? 'bg-green-500 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player 2
              </label>
              <input
                type="text"
                name="player2Name"
                value={formValues.player2Name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                maxLength={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
              />
              <div className="grid grid-cols-5 gap-2">
                {animalEmojis.slice(10).map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormValues(prev => ({ ...prev, player2Emoji: emoji }))}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      formValues.player2Emoji === emoji
                        ? 'bg-green-500 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formValues.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            disabled={!formValues.player1Emoji || !formValues.player2Emoji}
            className="w-full py-3 px-4 bg-green-600 text-white text-lg font-medium rounded-md hover:bg-green-700 active:bg-green-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupForm;