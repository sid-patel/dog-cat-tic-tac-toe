import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const Rules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Game Rules"
      >
        <HelpCircle size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Game Rules</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-lg mb-2">How to Play</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Players take turns placing their symbol (🐶 Dog or 🐱 Cat) on the 5x5 board</li>
                <li>Each move costs 1 dollar</li>
                <li>Connecting 3 of your symbols in a row (horizontally, vertically, or diagonally) earns 1 star and 5 dollars</li>
                <li>The game continues until one player runs out of dollars</li>
                <li>The winner is the player with more dollars and stars at the end</li>
              </ul>
              
              <h4 className="font-bold text-lg mb-2">Difficulty Levels</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><span className="font-medium">Easy:</span> Start with 30 dollars</li>
                <li><span className="font-medium">Medium:</span> Start with 20 dollars</li>
                <li><span className="font-medium">Hard:</span> Start with 15 dollars</li>
              </ul>
              
              <h4 className="font-bold text-lg mb-2">Special Rules</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If there's a tie (both players run out of dollars with the same number of stars), both players get 10 bonus dollars and the game continues</li>
                <li>Sound effects play when a player makes a move (dog barking or cat meowing)</li>
                <li>The winner gets a special celebration animation!</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rules;