import { createContext } from 'react'

/* Context for login status */
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  login: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  handleLogout: () => {},
  isLoggedIn: false 
})
