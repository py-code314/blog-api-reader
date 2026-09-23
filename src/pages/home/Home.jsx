/* -------------------- Styles -------------------- */
import styles from './Home.module.css'
/* -------------------- Components -------------------- */
import Hero from '../../components/sections/hero/Hero'
import RecentPosts from '../../components/sections/recent-posts/RecentPosts'

/* Component to display homepage */
const Home = () => {
  return (
    <>
      <main className={styles.home}>
        <Hero />
        <RecentPosts />
      </main>
    </>
  )
}

export default Home
