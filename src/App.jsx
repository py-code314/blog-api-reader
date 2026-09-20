/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'

/* Main App component */
function App() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>Header</div>
      <div className={styles.sidebar}>Sidebar</div>
      <Outlet />
      <div className={styles.footer}>Footer</div>
    </div>
  )
}

export default App
