import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from  "react-bootstrap";

const PokemonCard = () => {
    const pokemons = useSelector(state => state.filteredPokemon);
    const dispatch = useDispatch();

    return (
            <div className="pokemon d-flex flex-wrap justify-content-center">
              {pokemons.map(pokemon =>
              <Link  onClick={() => dispatch({type: 'SHOW_DESCRIPTION', payload: pokemon.name})} to={pokemon.name}>
              <div className="pokemonContainer d-flex flex-column align-items-around">
                 <div className="pokemonImage">
                    <img src={pokemon.img} alt={pokemon.name}/>
                </div>
                <div className="d-flex flex-column align-items-between">
                    <h3>{pokemon.name}</h3>
                    <span>{pokemon.ntnlnum}</span>
                    <div className="justify-self-end">{pokemon.types.map(type => <Button className={type} onClick={() => dispatch({ type: 'FILTER_POKEMON_BY_TYPE', payload: type })}>{type}</Button>)}</div>
                </div>
                </div>
              </Link>  
                )}
            </div>
    )
}
export default PokemonCard;