import { useState } from "react"


export const SearchBar = ({onSearch, initialValue=""}) =>{

    const [input, setInput] = useState(initialValue)

    function handleSubmit(e){
        e.preventDefault()
        onSearch(input.trim().toLowerCase())
    }

    return(
        <form action="" onSubmit={handleSubmit} className="search-bar">
            <input type="text" name="" id="" 
            placeholder="search an pokemon..."
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}