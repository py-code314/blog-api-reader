/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import Sidebar from './components/layouts/sidebar/Sidebar'

/* Main App component */
function App() {
  return (
    <div className={styles.page}>
      <Header/>
      <Sidebar/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
