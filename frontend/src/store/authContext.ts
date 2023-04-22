import { createContext } from 'react'

export type User = {
  name: string
  login: string
  id: number
  roles: { authority: string }[]
}

export type AuthType = {
  user?: User
  updateUser?(user?: User): void
}

const initialValue: AuthType = {}

const AuthContext = createContext(initialValue)

export default AuthContext
