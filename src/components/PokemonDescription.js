import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PokemonDescription = () => {
    const pokemon = useSelector(state => state.selectedPokemon);
    const dispatch = useDispatch();

    console.log(pokemon);
    return(
        <div className="d-flex-wrap">
            <h2>{pokemon.name}</h2>
            <img src = {pokemon.img} alt={pokemon.name}/>
            <p>{pokemon.ntnlnum}</p>
            <p>{pokemon.Description}</p>
            <div>
                 {(pokemon.length !== 0) && pokemon.types.map((type) =><Link to={`${type}`}><Button className={type} onClick={() => dispatch({ type: 'FILTER_POKEMON_BY_TYPE', payload: type})}>{type}</Button></Link>)}
            </div>
                 <Link to="/">Back to Home</Link>
        </div>
    )
}

export default PokemonDescription;