/* -------------------- Styles -------------------- */
import styles from './Header.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Navbar from '../navbar/Navbar'

/* Component for header */
const Header = () => {
  return (
    <header className={styles.header}>
      <title>Sciblr</title>
      {/* Title */}
      <Link to={`/home`}>
        <h1 className={styles.title}>SCRIBLR</h1>
      </Link>
      <Navbar/>
    </header>
  )
}

export default Header
