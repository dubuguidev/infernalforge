'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authStorage } from '@/services/api'
import { login as loginRequest, register as registerRequest } from '@/services/auth'
import type { AuthUser, LoginPayload, RegisterPayload } from '@/types/auth'

const USER_KEY = 'infernal_user'

interface AuthContextValue {
  user: AuthUser | null
  isReady: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem(authStorage.tokenKey)
    const rawUser = window.localStorage.getItem(USER_KEY)

    if (token && rawUser) {
      try {
        setUser(JSON.parse(rawUser) as AuthUser)
      } catch {
        window.localStorage.removeItem(authStorage.tokenKey)
        window.localStorage.removeItem(USER_KEY)
      }
    }

    setIsReady(true)
  }, [])

  const persistSession = (token: string, nextUser: AuthUser) => {
    window.localStorage.setItem(authStorage.tokenKey, token)
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const login = async (payload: LoginPayload) => {
    const result = await loginRequest(payload)
    persistSession(result.token, result.user)
  }

  const register = async (payload: RegisterPayload) => {
    const result = await registerRequest(payload)
    persistSession(result.token, result.user)
  }

  const logout = () => {
    window.localStorage.removeItem(authStorage.tokenKey)
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, isReady],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
