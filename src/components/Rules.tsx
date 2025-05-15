import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const Rules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Game Rules"
      >
        <HelpCircle size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-amber-200">
              <h3 className="text-xl font-bold text-amber-900">Game Rules</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-amber-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-lg mb-2 text-amber-900">How to Play</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-amber-900">
                <li>Players take turns placing their chosen animal on the 5x5 board</li>
                <li>Each move costs 1 dollar</li>
                <li>Connecting 3 of your symbols in a row (horizontally, vertically, or diagonally) earns 1 star and 5 dollars</li>
                <li>The game continues until one player runs out of dollars</li>
                <li>The winner is the player with more dollars and stars at the end</li>
              </ul>
              
              <h4 className="font-bold text-lg mb-2 text-amber-900">Difficulty Levels</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-amber-900">
                <li><span className="font-medium">Easy:</span> Start with 20 dollars</li>
                <li><span className="font-medium">Medium:</span> Start with 15 dollars</li>
                <li><span className="font-medium">Hard:</span> Start with 10 dollars</li>
              </ul>
              
              <h4 className="font-bold text-lg mb-2 text-amber-900">Special Rules</h4>
              <ul className="list-disc pl-5 space-y-2 text-amber-900">
                <li>If there's a tie (both players run out of dollars with the same number of stars), both players get 10 bonus dollars and the game continues</li>
                <li>Sound effects play when a player makes a move</li>
                <li>The winner's animal emoji celebrates with an animation!</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rules;