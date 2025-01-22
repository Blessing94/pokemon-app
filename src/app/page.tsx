'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const Home = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Tracks selected Pokémon types
  const [types, setTypes] = useState<string[]>([]); // Stores available Pokémon types
  const [pokemons, setPokemons] = useState<any[]>([]); // Pokémon data for display
  const [totalPokemons, setTotalPokemons] = useState<number>(0); // Total Pokémon count
  const [page, setPage] = useState<number>(1); // Current pagination page

  // Fetches Pokémon types and initializes the default Pokémon list
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results.map((type: { name: string }) => type.name));
    };

    fetchTypes();
    fetchDefaultPokemons();
  }, []);

  // Fetches default Pokémon data for the current page
  const fetchDefaultPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const data = await response.json();

    setTotalPokemons(data.results.length);// Sets total Pokémon count

    const defaultPokemons = await Promise.all(
      data.results
        .slice((page - 1) * 24, page * 24)
        .map(async (pokemon: { name: string }) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return res.json();
        })
    );
    setPokemons(defaultPokemons);// Updates Pokémon data for display
  };

   // Updates Pokémon list based on selected types or resets to default
  useEffect(() => {
    if (selectedTypes.length > 0) {
      fetchFilteredPokemons();
    } else {
      fetchDefaultPokemons();
    }
  }, [selectedTypes, page]);

  // Fetches Pokémon based on selected types
  const fetchFilteredPokemons = async () => {
    try {
      const typeResponses = await Promise.all(
        selectedTypes.map(type =>
          fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json())
        )
      );

      const filteredPokemons = typeResponses.reduce((intersection, typeData, index) => {
        const currentTypePokemons = new Set(typeData.pokemon.map((p: any) => p.pokemon.name));
        if (index === 0) return currentTypePokemons;
        return new Set([...intersection].filter(pokemon => currentTypePokemons.has(pokemon)));
      }, new Set<string>());

      const detailedPokemons = await Promise.all(
        Array.from(filteredPokemons)
          .slice((page - 1) * 24, page * 24)// Handles pagination for filtered results
          .map(async name => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return await response.json();
          })
      );

      setPokemons(detailedPokemons);
      setTotalPokemons(filteredPokemons.size);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  // Toggles type selection for filtering
  const toggleTypeSelection = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setPage(1); // Reset to the first page when type selection changes
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.pageContainer}>
      <h1>All Pokémon Types</h1>
      <h3>Total Pokémon: {totalPokemons}</h3>
      <div className={styles.typeButtons}>
        {types.map(type => (
          <button
            key={type}
            onClick={() => toggleTypeSelection(type)}
            className={`${styles.typeButton} ${
              selectedTypes.includes(type) ? styles.selectedType : ''
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <h2>Pokémon</h2>
      <div className={styles.pokemonGrid}>
        {pokemons.length === 0 ? (
          <p>No Pokémon to display for the Selected type!</p>
        ) : (
          pokemons.map((pokemon: { name: string, id: number, sprites: { front_default: string } }) => (
            <div key={pokemon.id} className={styles.pokemonCard}>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Number {pokemon.id}</p>
            </div>
          ))
        )}
      </div>

      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={pokemons.length < 24 || totalPokemons <= page * 24}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;





