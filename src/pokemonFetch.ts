import type { Pokemon } from "./types";

const POSSIBLE_POKEMON = 1025;

const getRandomNumber = () => {
    return Math.floor(Math.random() * (POSSIBLE_POKEMON + 1));
};

const getPokemon = async (id: number): Promise<Pokemon> => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

    const response = await fetch(url);
    const { name, sprites } = await response.json();

    return { id: id, name: name, image: sprites.front_default };
};

export const getRandomPokemonList = async (count: number): Promise<Pokemon[]> => {
    const randomIds: number[] = [];

    while (randomIds.length < count) {
        const id = getRandomNumber();

        if (randomIds.includes(id)) continue;

        randomIds.push(id);
    }

    return await Promise.all(randomIds.map((id) => getPokemon(id)))
};
