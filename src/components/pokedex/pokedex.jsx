import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './pokedex.css'
function Pokedex(){
    return(
        <>
            <div className="pokedex-wrapper">
                <h1 id="pokedex-heading">pokedex</h1>
                <Search/>
                <PokemonList/>
            </div>
        </>
    )
}
export default Pokedex;