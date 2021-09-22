import React from 'react';
import './App.css';
import {
    Link,
    Redirect

} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import {Card, Image} from "semantic-ui-react";
import PokeCard from './Pokemon/PokeCard';

function App() {
  return (
      <div style={{backgroundColor: 'grey'}}>
        <Pokemon/>
      </div>
  );
}

class Pokemon extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {value: '',redirect:null,pokemons: []};
    this.handleChange = this.handleChange.bind(this);
    this.getPokemonData = this.getPokemonData.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.initialLoad = this.initialLoad.bind(this);

  }

  componentDidMount()// se apeleaza la montare
  {
    this.initialLoad();
  }

  // sa fac doar la search cu event cu target.value
  handleChange = (event)=>
  {
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
  // dau return la componenta si dau la props elementul(e)
  render()
  {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
        <div>
          <form>
            <label className="App-pokemon-label">Pokemon: </label>
            <input  type="text" onChange={this.handleChange} />
          </form>
            <br/>
          <Card.Group id={"Pokemons"}  centered={true}>
            {
              this.state.pokemons.sort((a, b) => {
                if (a.id > b.id)
                  return 1;
                return -1;
              })
              .map(e=>
              {
                return(
                    <PokeCard pokedata={e}/>
                );
              })
            }
          </Card.Group>
        </div>
    );
  }

  initialLoad = () =>
  {
    fetch('http://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(allpokemon =>
        {
          allpokemon["results"].forEach((pokemon) =>
          {
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
  //la array fac doar de pokedata
  showPokeData = (pokedata)=>
  {
    this.setState({
      pokemons: [...this.state.pokemons,pokedata]
    })
  }
//componenta noua care sa primeasca poke data
  firstPage = (pokedata) =>
  {
    return (
        <Card key={pokedata.id}>
            <Link to={`/${pokedata.id}`}> {/*asa pun variabile in javascript */}
                <Image src={pokedata.sprites.front_default || pokedata.sprites.back_default} alt="" centered={true}/>
            </Link>
            <Card.Content data-name={pokedata.name} className={"allPoke"}>
                <Card.Header>Pokemon Name:{pokedata.name}</Card.Header>
                <Card.Description>Pokemon Id: {pokedata.id}</Card.Description>
            </Card.Content>

        </Card>
    );
  }
}

export default App;
