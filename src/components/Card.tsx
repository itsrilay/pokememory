import type { Pokemon } from '../types';

interface CardProps {
    pokemon: Pokemon;
    selectCard: (id: number) => void;
    shouldAnimate: boolean;
}

export default function Card({ pokemon, selectCard, shouldAnimate }: CardProps) {
    return (
        <div className={shouldAnimate ? 'card show' : 'card'}>
            <button className='card-button' onClick={() => selectCard(pokemon.id)}>
                <div className='img-container'>
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <p className='pokemon'>{pokemon.name}</p>
            </button>
        </div>
    );
}