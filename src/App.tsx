import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/30 backdrop-blur-sm">
        <Game />
      </div>
    </div>
  );
}

export default App;