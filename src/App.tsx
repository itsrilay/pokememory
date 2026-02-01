import { useState } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import type { Difficulty } from './types';

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');

    const handleGameStart = () => setGameStarted(!gameStarted);

    const handleDifficulty = (difficulty: Difficulty) => {
        setDifficulty(difficulty);
    };

    return (
        <>
            {gameStarted ? (
                <Game difficulty={difficulty} quitGame={handleGameStart} />
            ) : (
                <Menu
                    difficulty={difficulty}
                    handleDifficulty={handleDifficulty}
                    startGame={handleGameStart}
                />
            )}
        </>
    );
}
