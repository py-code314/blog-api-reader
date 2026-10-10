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
import { NavLink } from 'react-router'

/* Component to show sidebar */
const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        {/* Navigation links */}
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Use 'NavLink' to apply active styles to the link */}
              {/* Posts link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={`/home/posts`}>
                {({ isActive }) => (
                  <>
                    {/* Apply active styles to icon too if the link is clicked */}
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={postsIcon}
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className={styles.label}>Posts</span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* Authors link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={`/home/authors`}>
                {({ isActive }) => (
                  <>
                    {/* Apply active styles to icon too if the link is clicked */}
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={authorsIcon}
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className={styles.label}>Authors</span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* Categories link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={`/home/categories`}>
                {({ isActive }) => (
                  <>
                    {/* Apply active styles to icon too if the link is clicked */}
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={categoriesIcon}
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className={styles.label}>Categories</span>
                  </>
                )}
              </NavLink>
            </li>
            {/* Tags link  */}
            <li className={styles.navItem}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={`/home/tags`}>
                {({ isActive }) => (
                  <>
                    {/* Apply active styles to icon too if the link is clicked */}
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={tagsIcon}
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className={styles.label}>Tags</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Placeholder links  */}
          <ul className={styles.navList}>
            {/* Profile  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.profileIcon}
                src={profileIcon}
                alt=""
                width={22}
                height={22}
              />
              <span className={styles.label}>Profile</span>
            </li>
            {/* Settings  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.settingsIcon}
                src={settingsIcon}
                alt=""
                width={22}
                height={22}
              />
              <span className={styles.label}>Settings</span>
            </li>
            {/* Help  */}
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.helpIcon}
                src={helpIcon}
                alt=""
                width={22}
                height={22}
              />
              <span className={styles.label}>Help</span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
