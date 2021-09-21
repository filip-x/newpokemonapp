import React from 'react';
import './App.css';
import {
    Link,
    Redirect

} from "react-router-dom";

function App() {
  return (
      <>
        <Pokemon/>
      </>
  );
}

// const PokemonPage = () =>
// {
//   return(
//         <ul>
//           <li>
//             <Link to={"/"}>Home</Link>
//           </li>
//           <li>
//             <Link to={"/displayPokemon"}>Pokemon</Link>
//           </li>
//         </ul>
//   );
// }

class Pokemon extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {value: '',redirect:null,pokemons: []};
    this.handleChange = this.handleChange.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this)
    this.getPokemonData = this.getPokemonData.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.initialLoad = this.initialLoad.bind(this);

  }
//  style : display grid

  componentDidMount()// se apeleaza la montare
  {
    this.initialLoad();
  }

  // sa fac doar la search cu event cu target.value
  handleChange = (event)=>
  {
    this.searchPokemon(event.target.value);
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
          <div id={"Pokemons"}>

            {
              this.state.pokemons.map(e=>
              {
                return(
                    e
                );
              })
            }
          </div>

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
            //if (pokemon.name.indexOf(poke) !== -1) asta era pentru cand trebuia sa luam doar unul
              this.getPokemonData(pokemon);
          })
        })
  }

  searchPokemon = (inputValue) =>
  {
    let poke = inputValue;
    console.log(poke);
    Array.prototype.forEach.call(document.getElementsByClassName("allPoke"), (pokemon) => {
      console.log(pokemon.dataset.name + " " + pokemon.dataset.name.indexOf(poke) + " " + poke);
      if (pokemon.dataset.name.indexOf(poke) !== 0)
        pokemon.style.display = "none";
      else pokemon.style.display = "block";
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
    //let ceva =  this.firstPage();
    //this.htmlDisplay.push(this.firstPage(pokedata));
    this.setState({
      pokemons: [...this.state.pokemons,this.firstPage(pokedata)]
    })
    //ReactDOM.render(<div>{this.htmlDisplay}</div>,document.getElementById("Pokemons"));
  }
//componenta noua care sa primeasca poke data
  firstPage = (pokedata) =>
  {

    // let pokedata = this.state.loadedPokedData;
    // daca pui data- ai atribut propriu
    return (
        <div key={pokedata.id} data-name={pokedata.name} className={"allPoke"}>
          <h6>Pokemon Name:{pokedata.name}</h6>
          <p>Pokemon Id: {pokedata.id}</p>
          <Link to={`/${pokedata.id}`}> {/*asa pun variabile in javascript */}
            <img src={pokedata.sprites.front_default || pokedata.sprites.back_default} alt=""/>
          </Link>
        </div>
    );
  }
}



export default App;
