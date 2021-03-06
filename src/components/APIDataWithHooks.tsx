import React, { useState, useEffect } from 'react'
import AutoCompleteWithHooks from './AutoCompleteWHooks'
import { fetchCharacters } from '../services/MarvelAPI'
import { formatCharacher } from '../utils'
import { Option } from '../types'

const APIDataWithHooks = () => {
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<Option[]>([])

  const fetchData = async (value?: string) => {
    try {
      setLoading(true)

      const { characters = [] } = await fetchCharacters(
        value && value.length > 0 ? { nameStartsWith: value } : {},
      )
      const formattedData = characters.map(formatCharacher)

      setLoading(false)
      setOptions(formattedData)

      return formattedData
    } catch (error) {
      setLoading(false)

      throw error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AutoCompleteWithHooks
      loading={loading}
      options={options}
      onSearch={fetchData}
      label="Marvel Characters (API Data With Hooks)"
      placeholder="Type a name"
    />
  )
}

export default APIDataWithHooks
