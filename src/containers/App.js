import React, {Component} from "react";
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList'
import './App.css';
import Scroll from '../components/Scroll'

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
        .then(response => response.json())
        .then(data => this.setState({pokemons: data.results }));
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
        console.log(event.target.value);
    }
    render(){
        const {pokemons, searchfield} = this.state;
        const filteredPokemons = pokemons.filter(pokemon => {
            const naoEhMega = !pokemon.name.includes('-mega');
            const naoEhGIGA = !pokemon.name.includes('-gmax');
            const naoEhMODE = !pokemon.name.includes('-mode');
            const naoEhBuild = !pokemon.name.includes('-build');
            
            const bateComBusca = pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
            
            return naoEhMega && bateComBusca && naoEhGIGA && naoEhMODE && naoEhBuild;
        })
        return !pokemons.length ?
        <h1>Loading</h1> :
        (
            <div className="tc">
                <h1 className="pokedex-title">PokeDex</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList pokemons={filteredPokemons} />
                </Scroll>
            </div>
        )
    }
}

export default App;
