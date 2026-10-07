import { createContext } from 'react'

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  login: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  handleLogout: () => {},
})
