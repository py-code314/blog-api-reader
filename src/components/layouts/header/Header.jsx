/* -------------------- Styles -------------------- */
import styles from './Header.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
// import NavBar from '../navbar/Navbar'

/* Component for header */
const Header = () => {
  return (
    <header className={styles.header}>
      <title>Sciblr</title>
      {/* Title */}
      <Link to={`/home`}>
        <h1 className={styles.title}>SCRIBLR</h1>
      </Link>
      {/* <NavBar /> */}
      <div className={styles.navbar}>Navbar</div>
    </header>
  )
}

export default Header
