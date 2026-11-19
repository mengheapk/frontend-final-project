import { useEffect, useState } from 'react'

function resolve(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : resolve(initialValue)
    } catch {
      return resolve(initialValue)
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be full or blocked (e.g. private mode); the app keeps working in memory.
    }
  }, [key, value])

  return [value, setValue]
}