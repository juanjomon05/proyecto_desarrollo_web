// src/services/storage.js
// Capa base: unico archivo que habla directo con localStorage.
// Ningun otro archivo del proyecto deberia llamar a localStorage directamente.

export function getItem(key) {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key) {
  localStorage.removeItem(key)
}