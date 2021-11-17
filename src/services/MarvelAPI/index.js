import fetch from './client'

export const fetchCharacters = async (params = {}) => {
  const {
    data: {
      data: { results },
    },
  } = await fetch('/characters', { params })

  return { characters: results }
}
