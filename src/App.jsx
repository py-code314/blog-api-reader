/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Context -------------------- */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from './contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
/* -------------------- Functions -------------------- */
import { validateToken } from './utils/auth/login/tokenValidation'

/* Main App component */
function App() {
  const navigate = useNavigate()

  // Get token from local storage
  const getToken = () => {
    const userToken = localStorage.getItem('jwtToken')
    return userToken ? userToken : null
  }

  // Get user from local storage
  const getUser = () => {
    const currentUser = localStorage.getItem('currentUser')
    return currentUser ? JSON.parse(currentUser) : null
  }

  // State variables
  const [token, setToken] = useState(getToken())
  const [currentUser, setCurrentUser] = useState(getUser())

  // Replace user if different user logged in
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  // Set and save token to local storage
  const login = (userToken, currentUser) => {
    setToken(userToken)
    localStorage.setItem('jwtToken', userToken)
    setCurrentUser(currentUser)
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }

  // Log out user
  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('jwtToken')
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    navigate('/home')
  }

  // Computed variables
  const user = localStorage.getItem('currentUser')
  const jwtToken = validateToken()

  const isLoggedIn = Boolean(user && jwtToken)

  return (
    <div className={styles.page}>
      <AuthContext
        value={{
          token,
          setToken,
          login,
          handleLogout,
          currentUser,
          setCurrentUser,
          isLoggedIn,
        }}>
        <Header />
        <Outlet />
        <Footer />
      </AuthContext>
    </div>
  )
}

export default App
