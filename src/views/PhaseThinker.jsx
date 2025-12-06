import React, { useState } from 'react';
import useGameStore from '../store/gameStore';
import Slider from '../components/Slider';
import Button from '../components/Button';
import Input from '../components/Input';
import { clsx } from 'clsx'; // Should ensure clsx is installed or use tailwind-merge if preferred

const PhaseThinker = () => {
    const { theme, targetValue, submitClue, gameMode, skipTheme, skipsRemaining } = useGameStore();
    const [clue, setClue] = useState('');

    const handleConfirm = () => {
        submitClue(gameMode === 'OFFLINE' ? 'Oral Clue' : clue);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <span className="text-xs font-bold tracking-widest text-primary-indigo uppercase">
                    {gameMode === 'OFFLINE' ? 'Penseur : Mémorisez la cible' : 'Vous êtes le Penseur'}
                </span>
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex justify-between items-center text-lg font-bold w-full relative">
                        <span className="text-primary-coral w-1/2 text-right pr-4">{theme.left}</span>
                        <div className="h-4 w-[1px] bg-gray-700"></div>
                        <span className="text-primary-indigo w-1/2 text-left pl-4">{theme.right}</span>
                    </div>
                </div>

                {/* Skip Theme Button */}
                <div className="flex justify-center pt-2">
                    <button
                        onClick={skipTheme}
                        disabled={skipsRemaining <= 0}
                        className={clsx(
                            "flex items-center space-x-1 text-xs px-3 py-1 rounded-full border transition-all",
                            skipsRemaining > 0
                                ? "border-gray-600 text-gray-400 hover:text-white hover:border-white"
                                : "border-gray-800 text-gray-700 cursor-not-allowed"
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                        <span>Changer ({skipsRemaining})</span>
                    </button>
                </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                <Slider
                    value={50}
                    showTarget={true}
                    targetValue={targetValue}
                    disabled={true}
                    className="opacity-100"
                />
            </div>

            {gameMode === 'OFFLINE' ? (
                <div className="space-y-6 text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
                        <p className="font-bold mb-1">Mode Passe-téléphone</p>
                        <p>1. Mémorisez la position de la cible.</p>
                        <p>2. Donnez votre indice A L'ORAL.</p>
                        <p>3. Appuyez ci-dessous pour cacher et passer.</p>
                    </div>
                    <Button fullWidth onClick={handleConfirm} className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-white dark:text-gray-900">
                        Cacher & Passer
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-center">
                        Donnez un indice qui correspond à la position cible.
                    </div>

                    <Input
                        value={clue}
                        onChange={(e) => setClue(e.target.value)}
                        placeholder="Votre indice..."
                    />

                    <Button fullWidth onClick={handleConfirm} disabled={!clue}>
                        Envoyer l'Indice
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PhaseThinker;
