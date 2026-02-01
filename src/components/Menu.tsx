import type { Difficulty } from "../types";

interface MenuProps {
    difficulty: Difficulty;
    handleDifficulty: (difficulty: Difficulty) => void;
    startGame: () => void;
}

export default function Menu({ difficulty, handleDifficulty, startGame }: MenuProps) {
    const formatDifficulty = (difficulty: Difficulty = "medium") =>
        difficulty[0]?.charAt(0).toUpperCase() + difficulty.substring(1);

    return (
        <main className='menu-container'>
            <h1 className='title'>PokeMemory</h1>
            <p className='difficulty-select'>
                Selected difficulty: {formatDifficulty(difficulty)}
            </p>

            <div className='difficulty-container'>
                <button
                    className='btn difficulty easy'
                    onClick={() => handleDifficulty("easy")}>
                    Easy
                </button>
                <button
                    className='btn difficulty medium'
                    onClick={() => handleDifficulty("medium")}>
                    Medium
                </button>
                <button
                    className='btn difficulty hard'
                    onClick={() => handleDifficulty("hard")}>
                    Hard
                </button>
            </div>
            <button className='btn play' onClick={() => startGame()}>
                Play
            </button>
        </main>
    );
}
