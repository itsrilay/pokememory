import type { Pokemon } from '../types';
import Card from './Card';

interface ContainerProps {
    pokemonList: Pokemon[];
    handleClick: (id: number) => void;
    loading: boolean;
    shouldAnimate: boolean;
}

export default function PokemonContainer({
    pokemonList,
    handleClick,
    loading,
    shouldAnimate
}: ContainerProps) {
    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }

    return (
        <div className={`pokemon-list ${loading ? 'loaded' : ''}`}>
            {pokemonList.map((pokemon) => (
                <Card selectCard={handleClick} key={pokemon.id} pokemon={pokemon} shouldAnimate={shouldAnimate} />
            ))}
        </div>
    );
}
