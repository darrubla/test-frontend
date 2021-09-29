import axios from 'axios'

export const getListado = (offset = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
  return axios({
    method: 'GET',
    url
  })
}

export const getPokeInfo = (url) => {
  return axios({
    method: 'GET',
    url
  })
}

export const getUrl = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  return url
}


export const getPokeEntry = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  return axios({
    method: 'GET',
    url
  })
}

// export async function getListado(offset) {
//   const result = await callAPI(offset)
//   return
// }