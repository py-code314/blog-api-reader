/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'

/* Main App component */
function App() {
  return (
    <div className={styles.page}>
      <Header/>
      <div className={styles.sidebar}>Sidebar</div>
      <Outlet />
      <div className={styles.footer}>Footer</div>
    </div>
  )
}

export default App
