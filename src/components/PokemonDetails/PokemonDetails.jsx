import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails(){
    const {id}=useParams();
    const[pokemon,setPokemon]=useState({});
    async function downloadPokemon(){
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
    }

    useEffect(()=>{
        downloadPokemon();
    },[]);

    return(
        <div className="pokemon-details-wrapper">   
            <img className="pokemon-image" src={pokemon.image} alt="not found" />
            <div className="pokemon-details"><span>{pokemon.name}</span></div>
            <div className="pokemon-details">weight:{pokemon.weight}</div>
            <div className="pokemon-details">height:{pokemon.height}</div>
            <div className="pokemon-types">
                {pokemon.types ? (
                    pokemon.types.map((t) => <li key={t}>{t}</li>)
                ) : (
                    <div>No types available</div>
                )}
            </div>

        </div>
    )
}


export default PokemonDetails;