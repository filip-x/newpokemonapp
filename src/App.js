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
    // Use relative URL to go through nginx proxy (avoids CORS issues)
    fetch('/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(allpokemon => {
        allpokemon["results"].forEach((pokemon) => {
          this.getPokemonData(pokemon);
        })
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
      })
  }
  getPokemonData = (pokemon) => {
    // Convert pokeapi.co URL to relative URL for proxy
    let urlPokemon = pokemon.url;
    // Replace http://pokeapi.co or https://pokeapi.co with /api to use nginx proxy
    if (urlPokemon.includes('pokeapi.co')) {
      urlPokemon = urlPokemon.replace(/https?:\/\/pokeapi\.co\/api/, '/api');
    }
    fetch(urlPokemon)
      .then(response => response.json())
      .then(pokedata => this.showPokeData(pokedata))
      .catch(error => {
        console.error('Error fetching Pokemon data:', error);
      })
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