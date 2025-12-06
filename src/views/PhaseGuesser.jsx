import React from 'react';
import useGameStore from '../store/gameStore';
import Slider from '../components/Slider';
import Button from '../components/Button';

const PhaseGuesser = () => {
    const { theme, clue, sliderValue, setSliderValue, submitGuess, isHost, gameMode } = useGameStore();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                    <span>{theme.left}</span>
                    <span>{theme.right}</span>
                </div>

                {gameMode !== 'OFFLINE' && (
                    <div className="py-4">
                        <h2 className="text-3xl font-black text-gray-100">"{clue}"</h2>
                    </div>
                )}
                {gameMode === 'OFFLINE' && (
                    <div className="py-4">
                        <h2 className="text-lg font-medium text-gray-400">Écoutez l'indice du Penseur...</h2>
                    </div>
                )}
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    showTarget={false}
                />
            </div>

            <div className="flex justify-center">
                {/* Usually, only active player or host finalizes. For now, anyone. */}
                <Button onClick={submitGuess} className="w-full max-w-xs">
                    Valider
                </Button>
            </div>
        </div>
    );
};

export default PhaseGuesser;
