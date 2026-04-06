import { useState } from "react";

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("pokemon-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === pokemon.id);

      let updated;
      if (exists) {
        updated = prev.filter((p) => p.id !== pokemon.id);
      } else {
        updated = [...prev, pokemon];
      }

      localStorage.setItem("pokemon-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id) => {
    return favorites.some((p) => p.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}

export default useFavorites;