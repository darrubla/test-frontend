import React, { useState, useEffect } from 'react'

import { getPokeEntry, getPokeInfo } from '../../services/pokeAPI'

import './PokeCard.scss'

export default function PokeCard(props) {
  const { url } = props
  const [pokemon, setPokemon] = useState(null)
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    if (!pokemon) {
      const info = getPokeInfo(url)
      info
      .then(res => setPokemon(res.data))
    }
  }, [])

  useEffect(() => {
    if(pokemon && !entry) {
      const info = getPokeEntry(pokemon.id)
      info
      .then(res => setEntry(res.data.flavor_text_entries))
    }
  }, [pokemon])

  const showTypes = () => (
    pokemon.types.map((type, idx )=> <label key={`${type.type.name}-${idx}`}>{type.type.name}</label>)
  )

  const handlePokeInfo = () => {
    if (pokemon) {
      const { name, id } = pokemon
      return (
        <article className="poke-card container">
          <div className="poke-card__title">
            <p>#{id} - {name}</p>
            <span>
              favorito Icon
            </span>
          </div>
          <div className="poke-card__body">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={`logo pokemon #${id}`} />
            <section>
              <div className="poke-card__types">
                {showTypes()}
              </div>
              <h5>
                {entry
                  ? entry[3].flavor_text
                  : null
                }
              </h5>
            </section>
          </div>
        </article>
      )
    }
    return null
  }
  return handlePokeInfo()
}
