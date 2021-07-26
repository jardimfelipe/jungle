
export const getSavedState = (key: string) => {
  const result = localStorage.getItem(key)
  if (!result) return null
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export const saveState = (key: string, state: string) => {
  localStorage.setItem(key, JSON.stringify(state))
}

export const removeState = (key: string) => {
  localStorage.removeItem(key)
}
