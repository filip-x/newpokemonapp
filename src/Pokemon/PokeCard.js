import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import {Card, Image} from "semantic-ui-react";
import {
    Link,
} from "react-router-dom";

export default function PokeCard(props) {
    console.log(JSON.stringify(props));
    let pokedata = props.pokedata;
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
    )
}
