import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import {LoadingSpinner} from "../components/LoadingSpinner";

const typeColors = {
  fire: "#ff6b35", water: "#4dabf7", grass: "#51cf66",
  electric: "#fcc419", psychic: "#f06595", ice: "#74c0fc",
  dragon: "#845ef7", dark: "#495057", fairy: "#f783ac",
  normal: "#adb5bd", fighting: "#e67700", flying: "#91a7ff",
  poison: "#9775fa", ground: "#c09a6b", rock: "#a9a9a9",
  bug: "#94d82d", ghost: "#9775fa", steel: "#868e96",
};

export const  DetailPage = ({ pokemonUrl, onBack }) => {
  const { data, loading, error } = useFetch(pokemonUrl);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="message-box">
        <h2> Error</h2>
        <p>{error}</p>
        <button className="back-btn" onClick={onBack}>Back</button>
      </div>
    );
  }

  if (!data) return null;

  const pokemon = {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    height: data.height / 10, 
    weight: data.weight / 10, 
    abilities: data.abilities.map((a) => a.ability.name),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    url: pokemonUrl,
  };

  const favorite = isFavorite(pokemon.id);

  return (
    <div>
      <button className="back-btn" onClick={onBack}>
        Back to list
      </button>

      <div className="detail-container">

        <div className="detail-header">
          <img src={pokemon.image} alt={pokemon.name} />

          <div>
            <p style={{ color: "var(--text-muted)", marginBottom: 4 }}>
              #{String(pokemon.id).padStart(3, "0")}
            </p>
            <h1>{pokemon.name}</h1>

            <div style={{ margin: "8px 0" }}>
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="type-badge"
                  style={{ backgroundColor: typeColors[type] || "#adb5bd" }}
                >
                  {type}
                </span>
              ))}
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: 8 }}>
              📏 {pokemon.height}m &nbsp;|&nbsp; ⚖️ {pokemon.weight}kg
            </p>

            <p style={{ fontSize: "0.9rem", marginTop: 6 }}>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.join(", ")}
            </p>

            <button
              className="back-btn"
              style={{ marginTop: 12 }}
              onClick={() => toggleFavorite(pokemon)}
            >
              {favorite ? "❤️ delete from favorites" : "🤍 add to favorites"}
            </button>
          </div>
        </div>

        <div className="detail-stats">
          <h2>Stats</h2>
          {pokemon.stats.map((stat) => (
            <div key={stat.name} className="stat-row">
              <span className="stat-name">{stat.name}</span>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(stat.value / 255) * 100}%` }}
                />
              </div>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

