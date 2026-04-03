import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
const TOKEN_KEY = 'infernal_token'

export const apiClient = axios.create({ baseURL: API_URL })

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config

  const token = window.localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const authStorage = {
  tokenKey: TOKEN_KEY,
}
