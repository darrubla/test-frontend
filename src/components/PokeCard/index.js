import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { addFavorites, updateFavorites, removeFavorites, db } from '../../services/firebase'
import { getPokeInfo } from '../../services/pokeAPI'
import Icon from '@material-ui/core/Icon';
import { Button } from '@mui/material';

import './PokeCard.scss'

export default function PokeCard(props) {
  const { url, user } = props
  const [pokemon, setPokemon] = useState(null)
  const [docListener, setDocListener] = useState(0)
  const [favoritesList, setFavoritesList] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    const unsubscribe = db
      .collection("usuarios")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const list = data.filter(item => item.id === user)
        list !== docListener && setDocListener(list[0]);
      });
  }, [pokemon])

  useEffect(() => {
    if (!pokemon) {
      const info = getPokeInfo(url)
      info
      .then(res => setPokemon(res.data))
    }
  }, [])

  useEffect(() => {
    if (pokemon && docListener) {
      setFavoritesList(docListener.favorites)
    }
  }, [docListener])

  useEffect(() => {
    if (favoritesList) {
      favoritesList.includes(pokemon.id) ? setIsFavorite(true) : setIsFavorite(false)
    }
  }, [docListener, favoritesList])

  const handleClick = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      if (docListener !== 0) {
        if (typeof (docListener) === 'object') {
          return updateFavorites(pokemon.id, user)
        }
        return addFavorites(pokemon.id, user)
      }
    }else {
      return removeFavorites(pokemon.id, user)
    }
  }

  const handlePokeInfo = () => {
    if (pokemon) {
      const { name, id } = pokemon
      return (
        <Link
          className="poke-card container"
          to={{
          pathname: `/pokemon/${name}`,
          state: {pokemon, isFavorite}
          }}>
          <div className="poke-card__title">
            <h5>#{id} - {name}</h5>
            <Button
              name={id}
              onClick={(e) => {handleClick(e)}}
            >
              <Icon name={id}>{isFavorite ? 'favorite' : 'favorite_border'}</Icon>
            </Button>
          </div>
          <div className="poke-card__body">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={`logo pokemon #${id}`} />
          </div>
        </Link>
      )
    }
    return null
  }
  return handlePokeInfo()
}

PokeCard.propTypes = {
  url: PropTypes.string,
  user: PropTypes.object,
}
