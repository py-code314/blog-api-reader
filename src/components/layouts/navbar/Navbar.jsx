/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'

/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Component for navigation links */
const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link className={styles.link} to={`/home`}>
              Home
            </Link>
          </li>

          <li className={styles.navItem}><span className={styles.linkInactive}>Our Story</span></li>
          <li className={styles.navItem}><span className={styles.linkInactive}>Membership</span></li>
          <li className={styles.navItem}>
            <Link className={styles.link} to={`/login`}>
              Log in
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={`${styles.link} ${styles.linkSignup}`} to={`/signup`}>
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
