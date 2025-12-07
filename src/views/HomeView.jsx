import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import useGameStore from '../store/gameStore';
import { isFirebaseInitialized } from '../services/firebase';

const HomeView = () => {
    const { setNickname, createRoom, joinRoom, startOfflineGame } = useGameStore();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [view, setView] = useState('main'); // main, online-menu, join

    const handleCreate = () => {
        setNickname(name);
        createRoom();
    };

    const handleJoin = () => {
        setNickname(name);
        joinRoom(code);
    };

    if (view === 'main') {
        return (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300 relative h-full flex flex-col justify-center">
                <div className="space-y-6 w-full">
                    <Button fullWidth onClick={() => startOfflineGame()} className="h-32 text-xl bg-gradient-to-br from-primary-indigo to-primary-coral border-none">
                        <div className="flex flex-col items-center space-y-2">
                            <span>📱 Mode Hors Ligne</span>
                            <span className="text-sm font-normal opacity-80">Passe-téléphone • Indices oraux</span>
                        </div>
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background-dark text-gray-500">OU</span>
                        </div>
                    </div>

                    <Button variant="secondary" fullWidth onClick={() => setView('online-menu')} className="h-20 text-lg">
                        🌍 Multijoueur en Ligne
                    </Button>
                </div>

                {/* Status Footer */}
                <div className="absolute -bottom-4 left-0 right-0 text-center pb-4">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${isFirebaseInitialized
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${isFirebaseInitialized ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
                        <span>{isFirebaseInitialized ? "Serveur Connecté" : "Mode Simulation (Pas de serveur)"}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <div className="space-y-4">
                <Button variant="ghost" onClick={() => setView('main')} className="pl-0 hover:bg-transparent">
                    ← Retour
                </Button>
                <h2 className="text-2xl font-bold">Configuration</h2>
                <Input
                    label="Pseudo"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {view === 'online-menu' ? (
                <div className="space-y-4">
                    <Button fullWidth onClick={handleCreate} disabled={!name}>
                        Créer une Room
                    </Button>
                    <Button variant="secondary" fullWidth onClick={() => setView('join')} disabled={!name}>
                        Rejoindre une Room
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <Input
                        label="Code de la Room"
                        placeholder="ABCD"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={4}
                    />
                    <Button fullWidth onClick={handleJoin} disabled={!code}>
                        Entrer
                    </Button>
                </div>
            )}
        </div>
    );
};

export default HomeView;
