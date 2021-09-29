import React, { useState, useEffect } from 'react'

import PokeCard from "../../components/PokeCard"

import { db } from '../../services/firebase'
import { getUrl } from '../../services/pokeAPI'
import { auth } from "../../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import LoaderComponent from '../../components/Loader'

import { Container } from '@mui/material';

export default function Favorites() {
  const [user, loading, error] = useAuthState(auth)
  const [pokemon, setPokemon] = useState([])
  const [docListener, setDocListener] = useState(0)
  const [favoritesList, setFavoritesList] = useState(null)

  useEffect(() => {
    if (user) {
      const unsubscribe = db
      .collection("usuarios")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const list = data.filter(item => item.id === user.multiFactor.user.email)
        setDocListener(list[0]);
      });
    }
  }, [])

  useEffect(() => {
    if (favoritesList) {
      favoritesList.sort((a, b) => a-b)
      favoritesList.reverse().map((poke) => {
        return setPokemon(pokemon => [getUrl(poke), ...pokemon])
      })
    }
  }, [favoritesList])

  useEffect(() => {
    if (docListener) {
      setFavoritesList(docListener.favorites)
    }
  }, [docListener])

  const handleListado = () => {
    if(pokemon && user) {
      return pokemon.map((pokeUrl, idx) => {
        return (
          <PokeCard
            user={user.multiFactor.user.email}
            key={`favorite-${idx}`}
            url={pokeUrl}/>
        )
      })
    }
  }

  return (
    <Container>
      <LoaderComponent />
      <section className="home">
        { handleListado() }
      </section>
    </Container>
  )
}