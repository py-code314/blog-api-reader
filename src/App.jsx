/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Context -------------------- */
import { AuthContext } from './contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'

/* Main App component */
function App() {
  // Save token in local storage
  const setToken = (userToken) => {
    localStorage.setItem('jwtToken', userToken)
  }

  // Get token from local storage
  const getToken = () => {
    const userToken = localStorage.getItem('jwtToken')
    if (!userToken) {
      return null
    }
    return userToken
  }

  return (
    <div className={styles.page}>
      <AuthContext value={{getToken, setToken}}>
        <Header />
        <Outlet />
        <Footer />
      </AuthContext>
    </div>
  )
}

export default App
