/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import Sidebar from '../../components/layouts/sidebar/Sidebar'
import Hero from '../../components/sections/hero/Hero'
import RecentPosts from '../../components/sections/recent-posts/RecentPosts'

/* Component to display homepage */
const Homepage = () => {
  return (
    <>
      <Sidebar/>
      <main className={styles.home}>
        <Hero />
        <RecentPosts />
      </main>
    </>
  )
}

export default Homepage
