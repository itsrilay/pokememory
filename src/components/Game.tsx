import { useState, useEffect, useCallback } from 'react';
import { getRandomPokemonList } from '../pokemonFetch';
import Scoreboard from './Scoreboard';
import PokemonContainer from './PokemonContainer';
import GameResults from './GameResults';
import type { Pokemon, Difficulty } from '../types';

interface GameProps {
    difficulty: Difficulty;
    quitGame: () => void;
}

export default function Game({ quitGame, difficulty }: GameProps) {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [clickedIds, setClickedIds] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    const handleRestart = async () => {
        setClickedIds([]);
        setScore(0);
        setGameOver(false);
        setHasWon(false);
        setShouldAnimate(true);
        setPokemonList([]);

        const newList = await fetchData();
        if (newList) setPokemonList(newList);
    };

    const handleClick = (id: number) => {
        setShouldAnimate(false);
        if (clickedIds.includes(id)) {
            setGameOver(true);
            return;
        } else {
            const newIds = [...clickedIds, id];

            if (newIds.length === pokemonList.length) {
                setScore(score + 1);
                setHasWon(true);
                setGameOver(true);
            } else {
                setClickedIds(newIds);
                setScore(score + 1);
                handleShuffle();
            }
        }
    };

    const handleShuffle = () => {
        const newList = [...pokemonList];

        shuffleArray(newList);
        setPokemonList(newList);
    };

    const shuffleArray = (array: Pokemon[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j]!;
            array[j] = temp!;
        }
    };

    const fetchData = useCallback(async () => {
        const getListSize = () => {
            switch (difficulty) {
                case 'easy':
                    return 6;
                case 'medium':
                    return 10;
                case 'hard':
                    return 15;
                default:
                    return 6;
            }
        };

        setLoading(true);

        const size = getListSize();
        try {
            setError(null);
            const list = await getRandomPokemonList(size);
            return list;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                setError("An error happened. Please try again.");
            } else {
                console.log(e);
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, [difficulty]);

    useEffect(() => {
        let isMounted = true;

        fetchData().then((data) => {
            if (isMounted && data) setPokemonList(data);
        });

        return () => {
            isMounted = false;
            setLoading(false);
        };
    }, [fetchData]);

    return (
        <main className='game-container'>
            {gameOver && <GameResults hasWon={hasWon} />}
            <Scoreboard score={score} restart={handleRestart} />
            {error && <p className="error">{error}</p>}
            {!gameOver && (
                <PokemonContainer
                    pokemonList={pokemonList}
                    handleClick={handleClick}
                    loading={loading}
                    shouldAnimate={shouldAnimate}
                />
            )}
            <button className='btn return' onClick={() => quitGame()}>
                Return to Menu
            </button>
        </main>
    );
}
