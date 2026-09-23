/* -------------------- Styles -------------------- */
import styles from './Sidebar.module.css'
/* -------------------- Icons -------------------- */
import postsIcon from '../../../assets/icons/icon-posts.svg'
import authorsIcon from '../../../assets/icons/icon-authors.svg'
import categoriesIcon from '../../../assets/icons/icon-categories.svg'
import tagsIcon from '../../../assets/icons/icon-tags.svg'
import profileIcon from '../../../assets/icons/icon-profile.svg'
import settingsIcon from '../../../assets/icons/icon-settings.svg'
import helpIcon from '../../../assets/icons/icon-help.svg'
/* -------------------- Components -------------------- */
import { NavLink, Link } from 'react-router'

/* Component to show sidebar */
const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        {/* Navigation links */}
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Posts link  */}
              <Link className={styles.link} to={`/home`}>
                <img
                  className={styles.blogsIcon}
                  src={postsIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Posts</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              {/* Authors link  */}
              <Link className={styles.link} to={`/home`}>
                <img
                  className={styles.authorsIcon}
                  src={authorsIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Authors</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              {/* Categories link  */}
              <Link className={styles.link} to={`/home`}>
                <img
                  className={styles.categoriesIcon}
                  src={categoriesIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Categories</span>
              </Link>
            </li>
            {/* Tags link  */}
            <li className={styles.navItem}>
              <Link className={styles.link} to={`/home`}>
                <img
                  className={styles.tagsIcon}
                  src={tagsIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Tags</span>
              </Link>
            </li>
          </ul>

          {/* Placeholder links  */}
          <ul className={styles.navList}>
            {/* Profile  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
            {/* // TODO: Replace it with a bigger icon  */}
                <img
                  className={styles.profileIcon}
                  src={profileIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Profile</span>
            
            </li>
            {/* Settings  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
                <img
                  className={styles.settingsIcon}
                  src={settingsIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Settings</span>
            </li>
            {/* Help  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
                <img
                  className={styles.helpIcon}
                  src={helpIcon}
                  alt=""
                  width={32}
                  height={32}
                />
                <span>Help</span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
