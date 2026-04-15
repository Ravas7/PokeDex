import React from 'react';
import Card from './Card';

const CardList = ({ pokemons }) => {
    return(
        <div>
            {
                pokemons.map((pokemon, i) => {
                    const id = pokemon.url.split('/')[6]; 
                    
                    return (
                        <Card 
                            key={i}
                            id={id} 
                            name={pokemon.name}
                        />
                    );
                })
            } 
        </div>
    )
}

export default CardList;