export interface AuthUser {
  id: string
  username: string
  email: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  lgpdAccepted: boolean
}

export interface LoginPayload {
  identifier: string
  password: string
}
