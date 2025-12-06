import React from 'react';
import useGameStore from '../store/gameStore';
import PhaseThinker from './PhaseThinker';
import PhaseGuesser from './PhaseGuesser';
import PhaseReveal from './PhaseReveal';

const GameView = () => {
    const { gamePhase } = useGameStore();

    return (
        <div className="h-full flex flex-col justify-center">
            {gamePhase === 'THINKING' && <PhaseThinker />}
            {gamePhase === 'GUESSING' && <PhaseGuesser />}
            {gamePhase === 'REVEAL' && <PhaseReveal />}
        </div>
    );
};

export default GameView;
