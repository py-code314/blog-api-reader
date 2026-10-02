import { createContext } from 'react'

export const AuthContext = createContext({
  token: null,
  saveToken: () => {},
  // token: null,
  // setToken: () => {},
})
