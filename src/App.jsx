import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DetailPage } from "./pages/DetailPage";
import "./App.css"

const PAGES = {
  HOME: "home",
  DETAIL: "detail",
  FAVORITES: "favorites",
};


function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME)
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null)

  function handleSelectedPokemon(pokemon){
    setSelectedPokemonUrl(pokemon.url)
    setCurrentPage(PAGES.DETAIL)
  }

  function handleBack(){
    setCurrentPage(PAGES.HOME)
    setSelectedPokemonUrl(null)
  }

  return (
    <>
    <div className="app">
      <nav className="navbar">
        <span
        className="navbar-logo"
        onClick={()=>setCurrentPage(PAGES.HOME)}
        >
          PokeDex
        </span>
        <div className="navbar-links">
          <button
          className={currentPage === PAGES.HOME ? "active": ""}
          onClick={()=> setCurrentPage(PAGES.HOME)}
          >HOME</button>
          <button
          className={currentPage === PAGES.FAVORITES ? "active": ""}
          onClick={()=> setCurrentPage(PAGES.FAVORITES)}
          >Favorites</button>
        </div>
      </nav>

      <main>
        {currentPage === PAGES.HOME && (
          <HomePage onSelectPokemon={handleSelectedPokemon} />
        )}

        {currentPage === PAGES.DETAIL && (
          <DetailPage pokemonUrl={selectedPokemonUrl}
          onBack={handleBack} />
        )}

        {currentPage === PAGES.FAVORITES && (
          <FavoritesPage onSelectPokemon={handleSelectedPokemon} />
        )}
      </main>
    </div>
    </>
  )
}

export default App
