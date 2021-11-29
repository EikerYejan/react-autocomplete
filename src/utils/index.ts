import levenshtein from 'js-levenshtein'
import { Character, Option } from '../types'

export const removeSlash = (string = '') => {
  return string.replace(/\\/g, '').replace(/\//g, '')
}

export const getMatch = (searchTerm: string, options: Option[]) => {
  const regex = new RegExp(removeSlash(searchTerm))

  return options?.filter((option) => regex.test(option.label))
}

export const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatCharacher = (character: Character): Option => {
  const { name, id } = character

  return {
    label: name,
    value: id,
  }
}

export const sortByMatch = (searchTerm: string, results: Option[] = []) => {
  return results.sort((a, b) => {
    const aMatch = levenshtein(a.label, searchTerm)
    const bMatch = levenshtein(b.label, searchTerm)

    return aMatch - bMatch
  })
}

export const isAsyncFunction = (fn: () => void | Promise<unknown>) => {
  return fn.constructor.name === 'AsyncFunction'
}
