import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ name, id }) => {
  const [types, setTypes] = useState([]);

useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Erro na rede');
      return res.json();
    })
    .then(data => {
      setTypes(data.types.map(t => t.type.name));
    })
    .catch(err => console.log("Aguardando API...", err)); // Impede o erro fatal
}, [id]);

  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className='pokedex-card dib br3 pa3 ma2 grow bw2 shadow-5'>
      <div className='pokedex-screen'>
        <span className='pokemon-id'>#{id.toString().padStart(3, '0')}</span>
        <img alt={name} src={imgSrc} className='pokemon-img' />
        <h2 className='pokemon-name'>{name}</h2>
        <div className='types-container'>
          {types.map(type => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;