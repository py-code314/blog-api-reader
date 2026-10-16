/* -------------------- Styles -------------------- */
import styles from './DefaultMainLayout.module.css'
/* -------------------- Context -------------------- */
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import Hero from '../../sections/hero/Hero'
import RecentPosts from '../../sections/recent-posts/RecentPosts'

/* Content to show upon initial page load */
const DefaultMainLayout = () => {
  const { currentUser } = useContext(AuthContext)
  
  return (
    <>
      <div className={styles.mainDefault}>
        {currentUser && (
          <h2 className={styles.subTitle}>Welcome back {currentUser.name}</h2>
        )}
        <Hero />
        <RecentPosts />
      </div>
    </>
  )
}

export default DefaultMainLayout
