const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.REACT_APP_BACKEND_URL ||
  'http://localhost:4000'

export const API_URL = BACKEND_URL.replace(/\/$/, '')

export function fileUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const clean = String(path).replace(/^\/+/, '')
  return `${API_URL}/api/files/${clean}`
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  if (!response.ok) {
    let data
    try {
      data = await response.json()
    } catch {
      data = { detail: 'Error inesperado' }
    }
    throw new Error(data.detail || 'Error inesperado')
  }
  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}
