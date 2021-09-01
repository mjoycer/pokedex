import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from './components/PokemonCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Collapse } from 'react-bootstrap';
import PokemonDescription from './components/PokemonDescription';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useLayoutEffect } from 'react';

const App = () => {
  const filteredPokemon = useSelector(state => state.filteredPokemon);
  const pokemonTypes = useSelector(state => state.types);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);

    useLayoutEffect(() => {
      function updateScreenSize() {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateScreenSize);
      updateScreenSize();
      return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
  }

  const [width] = useMediaQuery();

  console.log(filteredPokemon);

  return (
    <div className="App">
      <Router>
        <div>
          {width < 769 ?
            <>
              <Button onClick={() => setOpen(!open)} aria-controls="buttonContainer" aria-expanded={open}>Show Pokemon Types</Button>
              <Collapse in={open}>
                <div className="buttonContainer d-flex-wrap collapse" id="buttonContainer">
                  {pokemonTypes.map(type => <Link to={`/${type.name}`}><Button className={type.name} onClick={() => dispatch({ type: 'FILTER_POKEMON_BY_TYPE', payload: type.name })}>{type.name}</Button></Link>)}
                </div>
              </Collapse>
            </>
            : <div className="buttonContainer">
              {pokemonTypes.map(type => <Link to={`/${type.name}`}><Button className={type.name} onClick={() => dispatch({ type: 'FILTER_POKEMON_BY_TYPE', payload: type.name })}>{type.name}</Button></Link>)}
            </div>}

          <div>
            <Route exact path="/"> <PokemonCard /></Route>
            <Switch>
              {filteredPokemon.map(pokemon =>
                <Route exact path={`/${pokemon.name}`} component={PokemonDescription} />
              )}
              {pokemonTypes.map(type =>
                <Route exact path={`/${type.name}`}> <PokemonCard /></Route>
              )}
            </Switch>
          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
