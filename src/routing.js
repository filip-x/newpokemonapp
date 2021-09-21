import React from 'react';
import PokemonShow from "./displayPokemon";
import App from "./App";
import {
    BrowserRouter as Router,
    Route,
    Switch

} from "react-router-dom";

const Rout = () =>
{
    return(

    <Router>
        <Switch>
            <Route path={`/:id`} component={PokemonShow}/>
            <Route path={"/"} component={App}/>
        </Switch>
    </Router>
    );
}
export default Rout;
