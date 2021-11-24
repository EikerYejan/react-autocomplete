/* eslint-disable import/prefer-default-export */
import fetch from './client'

export const fetchCharacters = async (params = {}) => {
  const {
    data: {
      data: { results },
    },
  } = await fetch('/characters', { params })

  return { characters: results }
}
