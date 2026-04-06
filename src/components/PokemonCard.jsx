const typeColors = {
  fire: "#ff6b35",
  water: "#4dabf7",
  grass: "#51cf66",
  electric: "#fcc419",
  psychic: "#f06595",
  ice: "#74c0fc",
  dragon: "#845ef7",
  dark: "#495057",
  fairy: "#f783ac",
  normal: "#adb5bd",
  fighting: "#e67700",
  flying: "#91a7ff",
  poison: "#9775fa",
  ground: "#c09a6b",
  rock: "#a9a9a9",
  bug: "#94d82d",
  ghost: "#9775fa",
  steel: "#868e96",
};

export const PokemonCard = ({pokemon, onSelect, onToggleFavorite, isFavorite}) =>{

    return(
        <div className="pokemon-card" onClick={()=>onSelect(pokemon)}>
            <button className="fav-btn"
            onClick={(e)=>{
                e.stopPropagation()
                onToggleFavorite(pokemon)
            }}>
            {isFavorite ? "❤️" : "🤍"}
            </button>

            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</p>

            <div>
                {pokemon.types && pokemon.types.map((type)=>(
                    <span
                    key={type}
                    className="type-badge"
                    style={{backgroundColor: typeColors[type] || "#adb5bd"}}
                    >
                        {type}
                    </span>
                ))}
            </div>
        </div>
    )
}