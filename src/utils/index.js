export const getMatch = (searchTerm, options) => {
  const regex = new RegExp(searchTerm)

  return options?.filter((option) => regex.test(option.label))
}

export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
