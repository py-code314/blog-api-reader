/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'

/* Main App component */
function App() {
  return (
    <div className={styles.page}>
      <Header/>
      <div className={styles.sidebar}>Sidebar</div>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
