import React from 'react';
import Layout from './components/Layout';
import useGameStore from './store/gameStore';
import HomeView from './views/HomeView';
import LobbyView from './views/LobbyView';
import GameView from './views/GameView';
import Logo from './components/Logo';

function App() {
  const { gameState } = useGameStore();

  return (
    <Layout>
      <header className="text-center py-6">
        <Logo />
      </header>

      <div className="flex-1 flex flex-col relative w-full">
        {gameState === 'HOME' && <HomeView />}
        {gameState === 'LOBBY' && <LobbyView />}
        {gameState === 'PLAYING' && <GameView />}
      </div>
    </Layout>
  );
}

export default App;
