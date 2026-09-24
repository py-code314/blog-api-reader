/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import Sidebar from '../../components/layouts/sidebar/Sidebar'
import Hero from '../../components/sections/hero/Hero'
import RecentPosts from '../../components/sections/recent-posts/RecentPosts'

/* Component to display homepage */
const Homepage = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <main className={styles.main}>
        <Hero />
        <RecentPosts />
      </main>
    </div>
  )
}

export default Homepage
