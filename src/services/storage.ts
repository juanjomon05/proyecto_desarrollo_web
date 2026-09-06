// src/services/storage.ts
// Capa base: unico archivo que habla directo con localStorage.
// Ningun otro archivo del proyecto deberia llamar a localStorage directamente.

export function getItem<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  return raw ? (JSON.parse(raw) as T) : null
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  localStorage.removeItem(key)
}
