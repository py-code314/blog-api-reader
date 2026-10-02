/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Context -------------------- */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from './contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'

/* Main App component */
function App() {
  const navigate = useNavigate()

  // Get token from local storage
  const getToken = () => {
    const userToken = localStorage.getItem('jwtToken')
    if (!userToken) {
      return null
    }
    return userToken
  }

  // State variables
  const [token, setToken] = useState(getToken() || null)

  // Set and save token to local storage
  const saveToken = (userToken) => {
    setToken(userToken)
    localStorage.setItem('jwtToken', userToken)
  }

  // Log out user
  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('jwtToken')
    navigate('/home')
  }

  return (
    <div className={styles.page}>
      <AuthContext value={{ token, saveToken, handleLogout }}>
        <Header />
        <Outlet />
        <Footer />
      </AuthContext>
    </div>
  )
}

export default App
