const TYPES = [
  "all", "fire", "water", "grass", "electric", "psychic",
  "ice", "dragon", "dark", "fairy", "normal", "fighting",
  "flying", "poison", "ground", "rock", "bug", "ghost", "steel"
];

export const FilterBar = ({selectedType, onTypeChange}) =>{
    return(
        <div className="filter-bar">
            <select name="" id=""
            value={selectedType}
            onChange={(e)=>onTypeChange(e.target.value)}
            >
                {TYPES.map((type)=>(
                    <option
                    key={type}
                    value={type}
                    >
                        {type == " all" ? "All types" : type.charAt(0). toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}