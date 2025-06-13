export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  user: User
}

export interface ErrorResponse {
  message: string
  code: string
}
