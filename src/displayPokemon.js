import React from "react";
import {useState}  from 'react';

const PokemonShow = (props) =>
{

    let [printStuff,setPrintStuff] = useState(null);
   const idPokemon = props.match.params.id;
   //now we featch again so we take the things what we need based on the only pokemon we have in the new tab
    fetch('http://pokeapi.co/api/v2/pokemon/'+idPokemon)
        .then(response => response.json())
        .then(onlyPokemon =>
        {
            if (printStuff == null)
                setPrintStuff(dataForSpecificPokemon(onlyPokemon));
        })
    console.log("Filip")
    return (
        <div>
            {printStuff}
        </div>
    );
}

const dataForSpecificPokemon = (onlyPokemon) =>
{
    let id = onlyPokemon.id;
     let name = onlyPokemon.name;
     let img  = onlyPokemon.sprites.front_default;
     let weight  = onlyPokemon.weight;
     let typeArray = [];
     pokemonType(onlyPokemon.types,typeArray);
    let printArray = typeArray.map((element,index) =>(<p key={index}>{element}</p>))
     return(
         <div>
             <p>{id}</p>
             <p>{name}</p>
             <p>{weight}</p>
             <div>
             {printArray}
             </div>
             <img src={img} alt={""}/>
         </div>
     );


    // console.log(name);
   // console.log(weight);
    //typeArray.forEach(element =>console.log(element));
     //aici vreau sa imi pun chestiile si sa le afisez , i think
}
const pokemonType = (types, typeArray) =>
{
    types.forEach(function (type)
        {
            typeArray.push(type['type']['name']);
        }
    )
}
export default PokemonShow;
