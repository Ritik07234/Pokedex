import { useEffect, useState} from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const[pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    const[nextUrl,setNextUrl]=useState("");
    const[prevUrl,setPrevUrl]=useState("");

    async function downloadPokemons(){
        setIsLoading(true);
        const response=await axios.get(pokedexUrl);
        //console.log(response);
        const pokemonResults=response.data.results;
        //console.log(response.data.results)

        //console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultPromise);
        
        const res=pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.other && pokemon.sprites.other.dream_world.front_default) || pokemon.sprites.front_shiny,
                types:pokemon.types}
        });
        setPokemonList(res)
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedexUrl]);

    
    return (
            <div className="Pokemon-list-wrapper">
                <div className="pokemon-wrapper">
                {(isLoading)?'Loading...':pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)}
                </div>
                <div className="controls">
                    <button disabled={prevUrl===undefined} onClick={()=>setPokedexUrl(prevUrl)}>prev</button>
                    <button disabled={nextUrl===undefined} onClick={()=>setPokedexUrl(nextUrl)}>next</button>
                </div>
                
            </div>
        )
}
export default PokemonList;