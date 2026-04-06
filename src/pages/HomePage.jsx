import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import {PokemonCard} from "../components/PokemonCard";
import {SearchBar} from "../components/SearchBar";
import {FilterBar} from "../components/FilterBar";
import {Pagination} from "../components/Pagination";
import {LoadingSpinner} from "../components/LoadingSpinner";

const PAGE_SIZE = 20;

export const HomePage = ({ onSelectPokemon }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState(null);

  const [allPokemonByType, setAllPokemonByType] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const { data, loading, error } = useFetch(url);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (selectedType === "all") {
      setUrl("https://pokeapi.co/api/v2/pokemon?limit=200");
    } else {
      setUrl(`https://pokeapi.co/api/v2/type/${selectedType}`);
    }
    setCurrentPage(1);
    setSearchTerm("");
  }, [selectedType]);

  useEffect(() => {
    if (!data) return;

    let list = [];

    if (selectedType === "all") {
      list = data.results || [];
    } else {
      list = (data.pokemon || []).map((p) => p.pokemon);
    }

    setAllPokemonByType(list);
  }, [data, selectedType]);

  useEffect(() => {
    let result = allPokemonByType;

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredList(result);
    setCurrentPage(1);
  }, [allPokemonByType, searchTerm]);

  useEffect(() => {
    if (filteredList.length === 0) {
      setDisplayedPokemons([]);
      return;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredList.slice(start, start + PAGE_SIZE);

    const fetchDetails = async () => {
      setDetailsLoading(true);
      try {
        const promises = pageItems.map((p) =>
          fetch(p.url).then((r) => r.json())
        );
        const results = await Promise.all(promises);

        const formatted = results.map((r) => ({
          id: r.id,
          name: r.name,
          image:
            r.sprites.other["official-artwork"].front_default ||
            r.sprites.front_default,
          types: r.types.map((t) => t.type.name),
          url: `https://pokeapi.co/api/v2/pokemon/${r.id}`,
        }));

        setDisplayedPokemons(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [filteredList, currentPage]);

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };


  if (!url && !loading) {
    return (
      <div className="message-box">
        <h2> Heyy)))</h2>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="message-box">
        <h2>something was worng :(</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="search-section">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        <FilterBar
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
      </div>

      {detailsLoading ? (
        <LoadingSpinner />
      ) : displayedPokemons.length === 0 ? (
        <div className="message-box">
          <h2>0 results</h2>
        </div>
      ) : (
        <>
          <div className="pokemon-grid">
            {displayedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelect={onSelectPokemon}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(pokemon.id)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredList.length}
            onPrev={() => setCurrentPage((p) => p - 1)}
            onNext={() => setCurrentPage((p) => p + 1)}
          />
        </>
      )}
    </div>
  );
}

