/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Context -------------------- */
import { AuthContext } from '../../../contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../core/button/Button'

/* Component for navigation links */
const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext)

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
          <li className={styles.navItem}>
            <span className={styles.linkInactive}>Our Story</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.linkInactive}>Membership</span>
          </li>
          {/* Show links based on login status  */}
          {isLoggedIn ? (
            <Button className="btnLogout" title="Logout" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link className={styles.link} to={`/login`}>
                  Log in
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  className={`${styles.link} ${styles.linkSignup}`}
                  to={`/signup`}>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
