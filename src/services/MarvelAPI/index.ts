/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios'
import { Character } from 'types'
import fetch from './client'

export const fetchCharacters = async (params: Record<string, unknown> = {}) => {
  const {
    data: {
      data: { results },
    },
  }: AxiosResponse<{ data: { results: Character[] } }> = await fetch('/characters', { params })

  return { characters: results }
}
