import React, { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const PhaseReveal = () => {
    const { theme, clue, sliderValue, targetValue, nextRound } = useGameStore();
    const [score, setScore] = useState(null);

    useEffect(() => {
        // Calculate Score
        // 0-100 scale.
        const diff = Math.abs(sliderValue - targetValue);
        let pts = 0;
        if (diff <= 2) pts = 4; // Bullseye
        else if (diff <= 8) pts = 3;
        else if (diff <= 15) pts = 2;

        setScore(pts);
    }, [sliderValue, targetValue]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-gray-500">"{clue}"</h2>
            </div>

            <div className="relative">
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <Slider
                        value={sliderValue}
                        targetValue={targetValue}
                        showTarget={true}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="p-6 bg-gradient-to-br from-surface-light to-gray-50 dark:from-surface-dark dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
                >
                    <div className="text-gray-500 text-sm uppercase tracking-wide">Points Marqués</div>
                    <div className="text-5xl font-black text-primary-indigo my-2">{score}</div>
                    <div className="text-sm text-gray-400">
                        {score === 4 && "SYNCHRO PARFAITE !"}
                        {score === 3 && "Vraiment pas loin !"}
                        {score === 2 && "Dans la zone..."}
                        {score === 0 && "À côté de la plaque..."}
                    </div>
                </motion.div>

                <Button fullWidth onClick={nextRound} variant="secondary">
                    Tour Suivant
                </Button>
            </div>
        </div>
    );
};

export default PhaseReveal;
