import React, { useEffect, useState } from "react"
import { Container, Button } from '@mui/material'

import PokeCard from "../../components/PokeCard"

import { getListado } from '../../services/pokeAPI'
import { auth } from "../../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { notify } from '../../utils/'
import IsLogged from "../../utils/IsLogged"

import "./Home.scss"

function Home() {
  const [user, loading, error] = useAuthState(auth)
  const [listado, setListado] = useState(null)
  const [offSet, setOffset] = useState(null)

  IsLogged()

  useEffect(() =>{
    const lista = getListado(offSet)
    lista
    .then(res => setListado(res.data.results))
    .catch(error => notify('error', '¡Upps, parece que la base de datos de la pokedex está en actualización, prueba más tarde!', 'getListadoError'))
  },[offSet])

  const handleListado = () => {
    if(listado && user) {
      return listado.map(pokemon => {
        return (
          <PokeCard
            user={user.multiFactor.user.email}
            key={pokemon.name}
            url={pokemon.url}/>
        )
      })
    }
  }

  const handleClick = ({name}) => {
    if (name === 'next') setOffset(offSet + 20)
    if (name === 'back') setOffset(offSet - 20)
  }

  return (
    <Container>
      <section className="home">
        { user && handleListado()}
      </section>
      <div className="home__nav-buttons">
        <Button
          name="back"
          onClick={({target}) => handleClick(target)}
          variant="contained">
          {`< Back`}
        </Button>
        <Button
          name="next"
          onClick={({target}) => handleClick(target)}
          variant="contained">
          {`Next >`}
        </Button>
      </div>
    </Container>
  )
}
export default Home