import React from 'react';
import Button from '../components/Button';
import useGameStore from '../store/gameStore';

const LobbyView = () => {
    const { roomCode, players, isHost, startGame } = useGameStore();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center space-y-2">
                <p className="text-gray-500 uppercase text-xs tracking-wider">Room Code</p>
                <div className="text-4xl font-mono font-bold tracking-widest text-primary-indigo">
                    {roomCode}
                </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Joueurs ({players.length})</h3>
                <ul className="space-y-3">
                    {players.map(p => (
                        <li key={p.id} className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-success"></div>
                            <span className="font-medium">{p.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {isHost ? (
                <Button fullWidth onClick={startGame}>Lancer la Partie</Button>
            ) : (
                <div className="text-center text-gray-500 animate-pulse">
                    En attente de l'hôte...
                </div>
            )}
        </div>
    );
};

export default LobbyView;
