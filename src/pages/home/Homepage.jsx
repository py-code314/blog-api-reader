/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Sidebar from '../../components/layouts/sidebar/Sidebar'


/* Component to display homepage */
const Homepage = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Homepage
