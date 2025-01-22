// Function to fetch Pokémon data with pagination (limit and offset)
export async function getPokemon(limit: number = 10, offset: number = 0) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    // If the response is not OK, throw an error
    if (!res.ok) {
        throw new Error("Failed to fetch Pokémon data");
    }

    return res.json();
}

// Function to fetch Pokémon types from the API
export async function getPokemonTypes() {
    const res = await fetch("https://pokeapi.co/api/v2/type");
    
    // If the response is not OK, throw an error
    if (!res.ok) {
        throw new Error("Failed to fetch Pokémon types");
    }
    
    return res.json();
}