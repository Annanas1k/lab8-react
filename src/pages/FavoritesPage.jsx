import useFavorites from "../hooks/useFavorites";
import {PokemonCard} from "../components/PokemonCard";

export const FavoritesPage = ({ onSelectPokemon }) =>{
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="message-box">
        <h2>0 favorites :(</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: "1.3rem" }}>
        your favotit pokemons ({favorites.length})
      </h2>

      <div className="pokemon-grid">
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={onSelectPokemon}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}

