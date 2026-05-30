export function getLocalStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const item = window.localStorage.getItem(key)

    if (!item) {
      return fallback
    }

    return JSON.parse(item) as T
  } catch {
    return fallback
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(key)
}