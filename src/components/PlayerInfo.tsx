import React from 'react';
import { PlayerState, Player } from '../types';
import { DollarSign, Star } from 'lucide-react';

interface PlayerInfoProps {
  player: PlayerState;
  type: Player;
  isCurrentPlayer: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, type, isCurrentPlayer }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md 
      ${isCurrentPlayer ? 'ring-4 ring-blue-400 transform scale-105' : ''} 
      transition-all duration-300`}
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{type === 'dog' ? '🐶' : '🐱'}</span>
        <h3 className="text-lg font-bold truncate">{player.name}</h3>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-green-600 mr-1" />
          <span className="font-medium">{player.dollars}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
          <span className="font-medium">{player.stars}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;