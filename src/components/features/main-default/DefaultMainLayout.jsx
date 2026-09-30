/* -------------------- Styles -------------------- */
import styles from './DefaultMainLayout.module.css'
/* -------------------- Components -------------------- */
import Hero from '../../sections/hero/Hero'
import RecentPosts from '../../sections/recent-posts/RecentPosts'

const DefaultMainLayout = () => {
  return (
    <>
      <div className={styles.mainDefault}>
        <Hero />
        <RecentPosts />
      </div>
    </>
  )
}

export default DefaultMainLayout
