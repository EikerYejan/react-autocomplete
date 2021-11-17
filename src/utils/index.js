export const getMatch = (searchTerm, options) => {
  const regex = new RegExp(searchTerm)

  return options?.filter((option) => regex.test(option.label))
}

export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatCharacher = (character) => {
  const { name, id } = character

  return {
    label: name,
    value: id,
  }
}
