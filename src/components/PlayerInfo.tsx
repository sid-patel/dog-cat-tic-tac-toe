import React from 'react';
import { PlayerState } from '../types';
import { DollarSign, Star } from 'lucide-react';

interface PlayerInfoProps {
  player: PlayerState;
  isCurrentPlayer: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, isCurrentPlayer }) => {
  if (!player) {
    return null;
  }

  return (
    <div className={`bg-white/90 backdrop-blur p-4 rounded-lg shadow-md 
      ${isCurrentPlayer ? 'ring-4 ring-green-500 transform scale-105' : ''} 
      transition-all duration-300`}
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{player.emoji}</span>
        <h3 className="text-lg font-bold truncate text-amber-900">{player.name}</h3>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-green-600 mr-1" />
          <span className="font-medium text-amber-900">{player.dollars}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
          <span className="font-medium text-amber-900">{player.stars}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;