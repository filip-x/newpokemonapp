import React from 'react';
import './App.css';
import {
  Link,
  Redirect

} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from "semantic-ui-react";
import PokeCard from './Pokemon/PokeCard';

function App() {
  return (
    <div style={{ backgroundColor: 'grey' }}>
      <Pokemon />
    </div>
  );
}

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', redirect: null, pokemons: [] };
    this.handleChange = this.handleChange.bind(this);
    this.getPokemonData = this.getPokemonData.bind(this);
    this.initialLoad = this.initialLoad.bind(this);

  }

  componentDidMount()// it calls when mounting
  {
    this.initialLoad();
  }

  handleChange = (event) => {
    //this.searchPokemon(event.target.value);
    let poke = event.target.value;
    console.log(poke);
    Array.prototype.forEach.call(document.getElementsByClassName("allPoke"), (pokemon) => {
      console.log(pokemon.dataset.name + " " + pokemon.dataset.name.indexOf(poke) + " " + poke);
      if (pokemon.dataset.name.indexOf(poke) !== 0)
        pokemon.parentNode.style.display = "none";
      else pokemon.parentNode.style.display = "block";
    })

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <form>
          <label className="App-pokemon-label">Pokemon: </label>
          <input type="text" onChange={this.handleChange} />
        </form>
        <br />
        <Card.Group id={"Pokemons"} centered={true}>
          {
            this.state.pokemons.sort((a, b) => {
              if (a.id > b.id)
                return 1;
              return -1;
            })
              .map(e => {
                return (
                  <PokeCard pokedata={e} />
                );
              })
          }
        </Card.Group>
      </div>
    );
  }

  initialLoad = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(allpokemon => {
        allpokemon["results"].forEach((pokemon) => {
          this.getPokemonData(pokemon);
        })
      })
  }
  getPokemonData = (pokemon) => {
    let urlPokemon = pokemon.url;
    fetch(urlPokemon)
      .then(response => response.json())
      .then(pokedata => this.showPokeData(pokedata))
  }
  showPokeData = (pokedata) => {
    this.setState({
      pokemons: [...this.state.pokemons, pokedata]
    })
  }
}

export default App;
// se poate face redax, se poate face cu un API care sa faca call-urile si sa trimit doar datele de care am nevoie 
// sau loading screen pana vin toate imaginile 
// freecodecamp